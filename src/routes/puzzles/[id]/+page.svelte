<script lang="ts">
    import { page } from "$app/stores";
    import { getPuzzleById } from "$lib/puzzles";
    import {
        generateCode,
        executeCode,
        downloadCode,
    } from "$lib/codeGenerator";
    import NodeEditor from "$lib/components/NodeEditor.svelte";
    import Toolbar from "$lib/components/Toolbar.svelte";
    import PuzzleInfo from "$lib/components/PuzzleInfo.svelte";
    import CodePreview from "$lib/components/CodePreview.svelte";
    import ContextMenu from "$lib/components/ContextMenu.svelte";
    import type { AppNode, AppEdge } from "$lib/types";
    import { ArrowLeft, Trash2 } from "@lucide/svelte";

    // Get puzzle from URL
    const puzzleId = $derived($page.params.id);
    const puzzle = $derived(getPuzzleById(puzzleId));

    // Editor state
    let nodes = $state<AppNode[]>([]);
    let edges = $state<AppEdge[]>([]);
    let generatedCode = $state("");
    let codeErrors = $state<string[]>([]);
    let codeWarnings = $state<string[]>([]);
    let currentResult = $state<string | undefined>(undefined);
    let isComplete = $state(false);
    let isRunning = $state(false);

    // Context menu state
    let contextMenu = $state<{
        x: number;
        y: number;
        items: Array<{
            label: string;
            icon?: any;
            action: () => void;
            variant?: "default" | "danger";
        }>;
    } | null>(null);

    // Initialize nodes when puzzle changes
    $effect(() => {
        if (puzzle) {
            nodes = JSON.parse(JSON.stringify(puzzle.initialNodes));
            edges = JSON.parse(JSON.stringify(puzzle.initialEdges));
            currentResult = undefined;
            isComplete = false;
            generatedCode = "";
        }
    });

    // Handle right-click on canvas
    function handleContextMenu(event: MouseEvent) {
        event.preventDefault();

        // Check if clicking on an edge or canvas
        const target = event.target as HTMLElement;
        const isEdge = target.closest(".svelte-flow__edge");

        if (isEdge) {
            const edgeId = isEdge.getAttribute("data-id");
            if (edgeId) {
                contextMenu = {
                    x: event.clientX,
                    y: event.clientY,
                    items: [
                        {
                            label: "Delete Connection",
                            icon: Trash2,
                            variant: "danger",
                            action: () => {
                                edges = edges.filter((e) => e.id !== edgeId);
                            },
                        },
                    ],
                };
            }
        }
    }

    function handleRun() {
        if (!puzzle) return;

        isRunning = true;

        // Generate code
        const result = generateCode(nodes, edges);
        generatedCode = result.code;
        codeErrors = result.errors;
        codeWarnings = result.warnings;

        if (result.errors.length === 0) {
            // Execute and get result
            const execution = executeCode(result.code);

            if (execution.error) {
                codeErrors = [...codeErrors, execution.error];
                currentResult = "Error: " + execution.error;
            } else {
                // Extract the result from logs
                const resultLog = execution.logs.find((l) =>
                    l.startsWith("Result:"),
                );
                if (resultLog) {
                    currentResult = resultLog.replace("Result: ", "").trim();

                    // Check if it matches expected
                    isComplete = currentResult === puzzle.expectedOutput;

                    // Update output nodes with actual values
                    nodes = nodes.map((node) => {
                        if (node.type === "output") {
                            return {
                                ...node,
                                data: {
                                    ...node.data,
                                    actualValue: currentResult,
                                },
                            };
                        }
                        return node;
                    });
                }
            }
        }

        isRunning = false;
    }

    function handleDownload() {
        if (generatedCode) {
            downloadCode(generatedCode, `${puzzleId}-solution.js`);
        }
    }

    function handleClear() {
        edges = [];
        currentResult = undefined;
        isComplete = false;
        generatedCode = "";

        // Reset output nodes
        nodes = nodes.map((node) => {
            if (node.type === "output") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        actualValue: undefined,
                    },
                };
            }
            return node;
        });
    }

    function handleReset() {
        if (puzzle) {
            nodes = JSON.parse(JSON.stringify(puzzle.initialNodes));
            edges = JSON.parse(JSON.stringify(puzzle.initialEdges));
            currentResult = undefined;
            isComplete = false;
            generatedCode = "";
        }
    }

    function handleAddNode() {
        // Not used in puzzle mode
    }
</script>

<svelte:head>
    <title>{puzzle?.title || "Puzzle"} - CodeFlow</title>
</svelte:head>

{#if puzzle}
    <div class="puzzle-page">
        <div class="puzzle-header">
            <a href="/puzzles" class="back-link">
                <ArrowLeft size={18} />
                <span>Back to Puzzles</span>
            </a>
        </div>

        <div class="puzzle-layout">
            <aside class="puzzle-sidebar">
                <PuzzleInfo
                    {puzzle}
                    {isComplete}
                    {currentResult}
                    showHints={true}
                />

                {#if generatedCode}
                    <div class="code-section">
                        <CodePreview
                            code={generatedCode}
                            errors={codeErrors}
                            warnings={codeWarnings}
                            onDownload={handleDownload}
                        />
                    </div>
                {/if}
            </aside>

            <main class="puzzle-main">
                <Toolbar
                    onRun={handleRun}
                    onDownload={handleDownload}
                    onClear={handleClear}
                    onAddNode={handleAddNode}
                    onReset={handleReset}
                    {isRunning}
                    showAddNodes={false}
                    showReset={true}
                />
                <div class="editor-container" oncontextmenu={handleContextMenu}>
                    <NodeEditor bind:nodes bind:edges />
                </div>
            </main>
        </div>
    </div>

    {#if contextMenu}
        <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            items={contextMenu.items}
            onClose={() => (contextMenu = null)}
        />
    {/if}
{:else}
    <div class="not-found">
        <h1>Puzzle Not Found</h1>
        <p>The puzzle you're looking for doesn't exist.</p>
        <a href="/puzzles">Back to Puzzles</a>
    </div>
{/if}

<style>
    .puzzle-page {
        display: flex;
        flex-direction: column;
        height: calc(100vh - 80px);
        overflow: hidden;
    }

    .puzzle-header {
        padding: 16px 24px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .back-link {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: #9ca3af;
        text-decoration: none;
        font-size: 14px;
        transition: all 0.2s;
    }

    .back-link:hover {
        color: #fff;
    }

    .puzzle-layout {
        display: grid;
        grid-template-columns: 380px 1fr;
        flex: 1;
        overflow: hidden;
    }

    .puzzle-sidebar {
        padding: 20px;
        overflow-y: auto;
        border-right: 1px solid rgba(255, 255, 255, 0.05);
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .code-section {
        margin-top: auto;
    }

    .puzzle-main {
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }

    .editor-container {
        flex: 1;
        overflow: hidden;
    }

    .not-found {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 400px;
        text-align: center;
    }

    .not-found h1 {
        font-size: 28px;
        margin: 0 0 12px 0;
    }

    .not-found p {
        color: #9ca3af;
        margin: 0 0 24px 0;
    }

    .not-found a {
        color: #6366f1;
        text-decoration: none;
    }

    .not-found a:hover {
        text-decoration: underline;
    }
</style>
