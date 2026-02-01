<script lang="ts">
    import {
        generateCode,
        executeCode,
        downloadCode,
    } from "$lib/codeGenerator";
    import NodeEditor from "$lib/components/NodeEditor.svelte";
    import Toolbar from "$lib/components/Toolbar.svelte";
    import CodePreview from "$lib/components/CodePreview.svelte";
    import type {
        AppNode,
        AppEdge,
        InputNodeData,
        OutputNodeData,
        FunctionNodeData,
    } from "$lib/types";
    import { Terminal, Save, FolderOpen } from "@lucide/svelte";
    import { browser } from "$app/environment";

    // Editor state
    let nodes = $state<AppNode[]>([]);
    let edges = $state<AppEdge[]>([]);
    let generatedCode = $state("");
    let codeErrors = $state<string[]>([]);
    let codeWarnings = $state<string[]>([]);
    let executionOutput = $state("");
    let isRunning = $state(false);
    let projectName = $state("My Script");

    // Load saved state on mount
    $effect(() => {
        if (browser) {
            const saved = localStorage.getItem("playground-state");
            if (saved) {
                try {
                    const state = JSON.parse(saved);
                    nodes = state.nodes || [];
                    edges = state.edges || [];
                    projectName = state.projectName || "My Script";
                } catch (e) {
                    console.error("Failed to load saved state:", e);
                }
            }
        }
    });

    // Auto-save
    $effect(() => {
        if (browser && (nodes.length > 0 || edges.length > 0)) {
            localStorage.setItem(
                "playground-state",
                JSON.stringify({
                    nodes,
                    edges,
                    projectName,
                    savedAt: new Date().toISOString(),
                }),
            );
        }
    });

    let nodeCounter = $state(1);

    function handleAddNode(type: "input" | "output" | "code" | "function") {
        const id = `${type}-${Date.now()}`;
        const position = {
            x: 100 + nodeCounter * 50,
            y: 100 + nodeCounter * 30,
        };
        nodeCounter++;

        let newNode: AppNode;

        switch (type) {
            case "input":
                newNode = {
                    id,
                    type: "input",
                    position,
                    data: {
                        label: "Input",
                        value: "10",
                        valueType: "number",
                    } as InputNodeData,
                };
                break;
            case "output":
                newNode = {
                    id,
                    type: "output",
                    position,
                    data: {
                        label: "Output",
                    } as OutputNodeData,
                };
                break;
            case "code":
                newNode = {
                    id,
                    type: "code",
                    position,
                    data: {
                        label: "Transform",
                        code: "return input[0] * 2;",
                        language: "javascript",
                        description: "Custom transformation",
                        inputs: ["value"],
                        outputs: ["result"],
                        editable: true,
                    },
                };
                break;
            case "function":
                newNode = {
                    id,
                    type: "function",
                    position,
                    data: {
                        label: "Custom Function",
                        code: "// Write your code here\nreturn input[0];",
                        inputs: ["input"],
                        outputs: ["output"],
                    } as FunctionNodeData,
                };
                break;
        }

        nodes = [...nodes, newNode];
    }

    function handleRun() {
        isRunning = true;

        // Generate code
        const result = generateCode(nodes, edges);
        generatedCode = result.code;
        codeErrors = result.errors;
        codeWarnings = result.warnings;

        if (result.errors.length === 0) {
            // Execute
            const execution = executeCode(result.code);

            if (execution.error) {
                codeErrors = [...codeErrors, execution.error];
                executionOutput = "Error: " + execution.error;
            } else {
                executionOutput = execution.logs.join("\n") || "No output";

                // Update output nodes with actual values
                const resultLog = execution.logs.find((l) =>
                    l.startsWith("Result:"),
                );
                if (resultLog) {
                    const actualValue = resultLog
                        .replace("Result: ", "")
                        .trim();
                    nodes = nodes.map((node) => {
                        if (node.type === "output") {
                            return {
                                ...node,
                                data: {
                                    ...node.data,
                                    actualValue,
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
        if (!generatedCode) {
            // Generate first
            const result = generateCode(nodes, edges);
            generatedCode = result.code;
        }

        if (generatedCode) {
            const filename =
                projectName.toLowerCase().replace(/\s+/g, "-") + ".js";
            downloadCode(generatedCode, filename);
        }
    }

    function handleClear() {
        nodes = [];
        edges = [];
        generatedCode = "";
        executionOutput = "";
        codeErrors = [];
        codeWarnings = [];
        nodeCounter = 1;

        if (browser) {
            localStorage.removeItem("playground-state");
        }
    }

    function handleSave() {
        if (browser) {
            localStorage.setItem(
                "playground-state",
                JSON.stringify({
                    nodes,
                    edges,
                    projectName,
                    savedAt: new Date().toISOString(),
                }),
            );
        }
    }
</script>

<svelte:head>
    <title>Playground - CodeFlow</title>
    <meta
        name="description"
        content="Create custom code snippets and connect them visually. Build your own scripts in the CodeFlow playground."
    />
</svelte:head>

<div class="playground-page">
    <div class="playground-header">
        <div class="header-left">
            <Terminal size={20} class="terminal-icon" />
            <input
                type="text"
                bind:value={projectName}
                class="project-name"
                placeholder="Project name..."
            />
        </div>
        <div class="header-right">
            <button class="header-btn" onclick={handleSave}>
                <Save size={16} />
                <span>Save</span>
            </button>
        </div>
    </div>

    <div class="playground-layout">
        <main class="playground-main">
            <Toolbar
                onRun={handleRun}
                onDownload={handleDownload}
                onClear={handleClear}
                onAddNode={handleAddNode}
                {isRunning}
                showAddNodes={true}
                showReset={false}
            />
            <div class="editor-container">
                <NodeEditor bind:nodes bind:edges />
            </div>
        </main>

        <aside class="playground-sidebar">
            <div class="sidebar-section">
                <h3>Output</h3>
                <div class="output-box">
                    {#if executionOutput}
                        <pre>{executionOutput}</pre>
                    {:else}
                        <p class="placeholder">
                            Run your script to see output here
                        </p>
                    {/if}
                </div>
            </div>

            <div class="sidebar-section">
                <CodePreview
                    code={generatedCode}
                    errors={codeErrors}
                    warnings={codeWarnings}
                    onDownload={handleDownload}
                />
            </div>

            <div class="sidebar-section tips">
                <h3>Quick Tips</h3>
                <ul>
                    <li>
                        Click <strong>Add Node</strong> to add inputs, outputs, or
                        functions
                    </li>
                    <li>
                        Drag from output handles to input handles to connect
                    </li>
                    <li>Click <strong>Run</strong> to execute your script</li>
                    <li>
                        Click <strong>Download</strong> to save as JavaScript file
                    </li>
                    <li>Your work is auto-saved to browser storage</li>
                </ul>
            </div>
        </aside>
    </div>
</div>

<style>
    .playground-page {
        display: flex;
        flex-direction: column;
        height: calc(100vh - 80px);
        overflow: hidden;
    }

    .playground-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 24px;
        background: rgba(0, 0, 0, 0.2);
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .header-left {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    :global(.terminal-icon) {
        color: #10b981;
    }

    .project-name {
        background: transparent;
        border: none;
        color: #fff;
        font-size: 18px;
        font-weight: 600;
        padding: 8px 0;
        outline: none;
        min-width: 200px;
    }

    .project-name::placeholder {
        color: #6b7280;
    }

    .header-right {
        display: flex;
        gap: 10px;
    }

    .header-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 16px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.05);
        color: #e0e0e0;
        font-size: 13px;
        cursor: pointer;
        transition: all 0.2s;
    }

    .header-btn:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.2);
    }

    .playground-layout {
        display: grid;
        grid-template-columns: 1fr 400px;
        flex: 1;
        overflow: hidden;
    }

    .playground-main {
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }

    .editor-container {
        flex: 1;
        overflow: hidden;
    }

    .playground-sidebar {
        padding: 20px;
        overflow-y: auto;
        border-left: 1px solid rgba(255, 255, 255, 0.05);
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .sidebar-section h3 {
        font-size: 14px;
        font-weight: 600;
        color: #fff;
        margin: 0 0 12px 0;
    }

    .output-box {
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 10px;
        padding: 16px;
        min-height: 100px;
        max-height: 200px;
        overflow: auto;
    }

    .output-box pre {
        margin: 0;
        font-family: "JetBrains Mono", "Fira Code", monospace;
        font-size: 13px;
        color: #10b981;
        white-space: pre-wrap;
    }

    .output-box .placeholder {
        margin: 0;
        color: #6b7280;
        font-size: 13px;
        font-style: italic;
    }

    .tips ul {
        margin: 0;
        padding-left: 18px;
    }

    .tips li {
        font-size: 13px;
        color: #9ca3af;
        line-height: 1.8;
    }

    .tips strong {
        color: #a5b4fc;
    }
</style>
