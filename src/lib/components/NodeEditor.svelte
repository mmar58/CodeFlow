<script lang="ts">
    import {
        SvelteFlow,
        Controls,
        Background,
        MiniMap,
        type NodeTypes,
        type Edge,
        type Connection,
        ConnectionMode,
        MarkerType,
    } from "@xyflow/svelte";
    import "@xyflow/svelte/dist/style.css";
    import { writable, get } from "svelte/store";

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

    // Track initialization to prevent loops
    let initialized = false;

    // Sync props to stores only when props change externally
    $effect(() => {
        if (!initialized) {
            nodesStore.set(nodes);
            edgesStore.set(edges);
            initialized = true;
        } else {
            // Only update if external change detected
            const currentNodes = get(nodesStore);
            const currentEdges = get(edgesStore);

            if (JSON.stringify(nodes) !== JSON.stringify(currentNodes)) {
                nodesStore.set(nodes);
            }
            if (JSON.stringify(edges) !== JSON.stringify(currentEdges)) {
                edgesStore.set(edges);
            }
        }
    });

    // Subscribe to store changes and update props
    nodesStore.subscribe((value) => {
        if (initialized && JSON.stringify(value) !== JSON.stringify(nodes)) {
            nodes = value;
            if (onNodesChange) {
                onNodesChange(value);
            }
        }
    });

    edgesStore.subscribe((value) => {
        if (initialized && JSON.stringify(value) !== JSON.stringify(edges)) {
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

    // Default edge style
    const defaultEdgeOptions = {
        animated: true,
        style: "stroke: #6366f1; stroke-width: 2px;",
        markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "#6366f1",
        },
    };

    // Check if connection already exists
    function connectionExists(
        source: string,
        target: string,
        sourceHandle?: string,
        targetHandle?: string,
    ): boolean {
        const currentEdges = get(edgesStore);
        return currentEdges.some(
            (edge) =>
                edge.source === source &&
                edge.target === target &&
                edge.sourceHandle === sourceHandle &&
                edge.targetHandle === targetHandle,
        );
    }

    // Validate connection before adding
    function isValidConnection(connection: Connection): boolean {
        // Prevent self-connections
        if (connection.source === connection.target) {
            return false;
        }

        // Prevent duplicate connections
        if (
            connectionExists(
                connection.source,
                connection.target,
                connection.sourceHandle || undefined,
                connection.targetHandle || undefined,
            )
        ) {
            return false;
        }

        return true;
    }

    // Handle connection events
    function handleConnect(event: CustomEvent) {
        const connection = event.detail;

        // Validate the connection
        if (!isValidConnection(connection)) {
            return;
        }

        if (onConnect) {
            onConnect({
                source: connection.source,
                target: connection.target,
            });
        }

        // Add the new edge with proper styling
        const newEdge: AppEdge = {
            id: `e-${connection.source}-${connection.target}-${Date.now()}`,
            source: connection.source,
            target: connection.target,
            sourceHandle: connection.sourceHandle,
            targetHandle: connection.targetHandle,
            animated: true,
            style: "stroke: #6366f1; stroke-width: 2px;",
            markerEnd: {
                type: MarkerType.ArrowClosed,
                color: "#6366f1",
            },
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
        {defaultEdgeOptions}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        snapToGrid
        snapGrid={[15, 15]}
        connectionMode={ConnectionMode.Loose}
        {isValidConnection}
        onconnect={handleConnect}
        onnodeschange={handleNodesChange}
        onedgeschange={handleEdgesChange}
        deleteKeyCode={readonly ? null : "Delete"}
        connectionLineStyle="stroke: #6366f1; stroke-width: 3px; stroke-dasharray: 5 5;"
        connectionRadius={30}
        elevateEdgesOnSelect={true}
        connectOnClick={false}
        autoPanOnConnect={false}
        panOnDrag={true}
    >
        <Controls position="bottom-left" />
        <Background variant="dots" gap={20} size={1} />
        <MiniMap
            position="bottom-right"
            pannable={true}
            zoomable={true}
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

    /* Remove white borders/backgrounds from nodes more aggressively */
    :global(.svelte-flow__node) {
        border: none !important;
        outline: none !important;
        box-shadow: none !important;
        background: transparent !important;
    }

    :global(.svelte-flow__edge-path) {
        stroke: #6366f1 !important;
        stroke-width: 2px !important;
    }

    :global(.svelte-flow__edge.animated path) {
        stroke-dasharray: 5;
        animation: dash 0.5s linear infinite;
    }

    :global(.svelte-flow__connection-line) {
        stroke: #a855f7 !important;
        stroke-width: 3px !important;
        stroke-dasharray: 5 5;
        animation: dash 0.3s linear infinite;
    }

    @keyframes dash {
        to {
            stroke-dashoffset: -10;
        }
    }

    :global(.svelte-flow__controls) {
        background: rgba(26, 26, 46, 0.95);
        border: 1px solid rgba(99, 102, 241, 0.3);
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }

    :global(.svelte-flow__controls button) {
        background: transparent;
        color: #888;
        border-bottom: 1px solid rgba(99, 102, 241, 0.2);
        padding: 8px;
        width: 28px;
        height: 28px;
    }

    :global(.svelte-flow__controls button:hover) {
        background: rgba(99, 102, 241, 0.2);
        color: #fff;
    }

    :global(.svelte-flow__controls button:last-child) {
        border-bottom: none;
    }

    :global(.svelte-flow__minimap) {
        background: rgba(26, 26, 46, 0.95);
        border: 1px solid rgba(99, 102, 241, 0.3);
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }

    :global(.svelte-flow__handle) {
        width: 14px;
        height: 14px;
        background: #6366f1;
        border: 3px solid #1a1a2e;
        transition: all 0.2s ease;
    }

    :global(.svelte-flow__handle:hover) {
        background: #a855f7;
        transform: scale(1.2);
        box-shadow: 0 0 10px rgba(168, 85, 247, 0.5);
    }

    :global(.svelte-flow__handle.connecting) {
        background: #10b981;
        animation: pulse 0.5s ease infinite;
    }

    @keyframes pulse {
        0%,
        100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
        }
        50% {
            transform: scale(1.2);
            box-shadow: 0 0 0 8px rgba(16, 185, 129, 0);
        }
    }

    :global(.svelte-flow__handle-left) {
        left: -7px;
    }

    :global(.svelte-flow__handle-right) {
        right: -7px;
    }

    :global(.svelte-flow__edge.selected .svelte-flow__edge-path) {
        stroke: #a855f7 !important;
        stroke-width: 3px !important;
    }

    /* Remove default selection outline */
    :global(.svelte-flow__node.selected) {
        outline: none !important;
    }
</style>
