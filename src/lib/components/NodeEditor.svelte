<script lang="ts">
    import {
        SvelteFlow,
        Controls,
        Background,
        MiniMap,
        useSvelteFlow,
        type NodeTypes,
    } from "@xyflow/svelte";
    import "@xyflow/svelte/dist/style.css";
    import { writable } from "svelte/store";

    import InputNode from "./nodes/InputNode.svelte";
    import OutputNode from "./nodes/OutputNode.svelte";
    import CodeNode from "./nodes/CodeNode.svelte";
    import FunctionNode from "./nodes/FunctionNode.svelte";

    import type { AppNode, AppEdge } from "$lib/types";

    interface Props {
        nodes: AppNode[];
        edges: AppEdge[];
        onNodesChange?: (nodes: AppNode[]) => void;
        onEdgesChange?: (edges: AppEdge[]) => void;
        onConnect?: (connection: { source: string; target: string }) => void;
        readonly?: boolean;
    }

    let {
        nodes = $bindable([]),
        edges = $bindable([]),
        onNodesChange,
        onEdgesChange,
        onConnect,
        readonly = false,
    }: Props = $props();

    // Create writable stores for Svelte Flow
    const nodesStore = writable<AppNode[]>(nodes);
    const edgesStore = writable<AppEdge[]>(edges);

    // Sync props to stores
    $effect(() => {
        nodesStore.set(nodes);
    });

    $effect(() => {
        edgesStore.set(edges);
    });

    // Subscribe to store changes and update props
    nodesStore.subscribe((value) => {
        if (JSON.stringify(value) !== JSON.stringify(nodes)) {
            nodes = value;
            if (onNodesChange) {
                onNodesChange(value);
            }
        }
    });

    edgesStore.subscribe((value) => {
        if (JSON.stringify(value) !== JSON.stringify(edges)) {
            edges = value;
            if (onEdgesChange) {
                onEdgesChange(value);
            }
        }
    });

    // Define custom node types
    const nodeTypes: NodeTypes = {
        input: InputNode,
        output: OutputNode,
        code: CodeNode,
        function: FunctionNode,
    } as unknown as NodeTypes;

    // Handle connection events
    function handleConnect(event: CustomEvent) {
        const connection = event.detail;
        if (onConnect) {
            onConnect({
                source: connection.source,
                target: connection.target,
            });
        }

        // Add the new edge
        const newEdge: AppEdge = {
            id: `e-${connection.source}-${connection.target}`,
            source: connection.source,
            target: connection.target,
            sourceHandle: connection.sourceHandle,
            targetHandle: connection.targetHandle,
            animated: true,
            style: "stroke: #6366f1; stroke-width: 2px;",
        };

        edgesStore.update((e) => [...e, newEdge]);
    }

    function handleNodesChange(event: CustomEvent) {
        if (readonly) return;

        const changes = event.detail;
        nodesStore.update((currentNodes) => {
            let updatedNodes = [...currentNodes];
            changes.forEach((change: any) => {
                if (change.type === "position" && change.position) {
                    updatedNodes = updatedNodes.map((node) =>
                        node.id === change.id
                            ? { ...node, position: change.position }
                            : node,
                    );
                }
            });
            return updatedNodes;
        });
    }

    function handleEdgesChange(event: CustomEvent) {
        if (readonly) return;

        const changes = event.detail;
        edgesStore.update((currentEdges) => {
            let updatedEdges = [...currentEdges];
            changes.forEach((change: any) => {
                if (change.type === "remove") {
                    updatedEdges = updatedEdges.filter(
                        (e) => e.id !== change.id,
                    );
                }
            });
            return updatedEdges;
        });
    }
</script>

<div class="node-editor">
    <SvelteFlow
        nodes={nodesStore}
        edges={edgesStore}
        {nodeTypes}
        fitView
        snapToGrid
        snapGrid={[15, 15]}
        onconnect={handleConnect}
        onnodeschange={handleNodesChange}
        onedgeschange={handleEdgesChange}
        deleteKeyCode={readonly ? null : "Delete"}
        connectionLineStyle="stroke: #6366f1; stroke-width: 2px;"
    >
        <Controls />
        <Background variant="dots" gap={20} size={1} />
        <MiniMap
            nodeColor={(node) => {
                switch (node.type) {
                    case "input":
                        return "#4ecca3";
                    case "output":
                        return "#f39c12";
                    case "code":
                        return "#6366f1";
                    case "function":
                        return "#10b981";
                    default:
                        return "#888";
                }
            }}
        />
    </SvelteFlow>
</div>

<style>
    .node-editor {
        width: 100%;
        height: 100%;
        background: #0f0f1a;
        border-radius: 12px;
        overflow: hidden;
    }

    :global(.svelte-flow) {
        background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%);
    }

    :global(.svelte-flow__edge-path) {
        stroke: #6366f1 !important;
        stroke-width: 2px !important;
    }

    :global(.svelte-flow__edge.animated path) {
        stroke-dasharray: 5;
        animation: dash 0.5s linear infinite;
    }

    @keyframes dash {
        to {
            stroke-dashoffset: -10;
        }
    }

    :global(.svelte-flow__controls) {
        background: rgba(26, 26, 46, 0.9);
        border: 1px solid #333;
        border-radius: 8px;
        overflow: hidden;
    }

    :global(.svelte-flow__controls button) {
        background: transparent;
        color: #888;
        border-bottom: 1px solid #333;
    }

    :global(.svelte-flow__controls button:hover) {
        background: rgba(99, 102, 241, 0.2);
        color: #fff;
    }

    :global(.svelte-flow__minimap) {
        background: rgba(26, 26, 46, 0.9);
        border: 1px solid #333;
        border-radius: 8px;
    }

    :global(.svelte-flow__handle) {
        width: 12px;
        height: 12px;
        background: #6366f1;
        border: 2px solid #1a1a2e;
    }

    :global(.svelte-flow__handle:hover) {
        background: #818cf8;
    }

    :global(.svelte-flow__handle-left) {
        left: -6px;
    }

    :global(.svelte-flow__handle-right) {
        right: -6px;
    }
</style>
