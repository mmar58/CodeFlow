<script lang="ts">
    import { Handle, Position } from "@xyflow/svelte";
    import type { CodeNodeData } from "$lib/types";
    import { Code2, Lock } from "@lucide/svelte";

    interface Props {
        data: CodeNodeData;
        selected?: boolean;
    }

    let { data, selected = false }: Props = $props();
</script>

<div class="code-node" class:selected class:locked={!data.editable}>
    <Handle type="target" position={Position.Left} id="input" />
    <div class="node-header">
        <Code2 size={14} />
        <span class="node-label">{data.label}</span>
        {#if !data.editable}
            <Lock size={12} class="lock-icon" />
        {/if}
    </div>
    {#if data.description}
        <p class="description">{data.description}</p>
    {/if}
    <div class="node-content">
        <pre class="code-preview"><code>{data.code}</code></pre>
    </div>
    <div class="io-info">
        {#if data.inputs.length > 0}
            <span class="inputs">
                in: {data.inputs.join(", ")}
            </span>
        {/if}
        {#if data.outputs.length > 0}
            <span class="outputs">
                out: {data.outputs.join(", ")}
            </span>
        {/if}
    </div>
    <Handle type="source" position={Position.Right} id="output" />
</div>

<style>
    .code-node {
        background: linear-gradient(135deg, #1e1e2e 0%, #252545 100%);
        border: 2px solid #6366f1;
        border-radius: 12px;
        padding: 12px 16px;
        min-width: 200px;
        max-width: 280px;
        color: #e0e0e0;
        box-shadow: 0 4px 20px rgba(99, 102, 241, 0.2);
        transition: all 0.2s ease;
    }

    .code-node:hover {
        border-color: #818cf8;
        transform: translateY(-2px);
        box-shadow: 0 6px 25px rgba(99, 102, 241, 0.3);
    }

    .code-node.selected {
        border-color: #a5b4fc;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
    }

    .code-node.locked {
        border-color: #4b5563;
    }

    .node-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 6px;
        color: #818cf8;
    }

    .node-label {
        font-weight: 600;
        font-size: 13px;
        flex: 1;
    }

    :global(.lock-icon) {
        color: #6b7280;
    }

    .description {
        font-size: 11px;
        color: #9ca3af;
        margin: 0 0 8px 0;
        line-height: 1.4;
    }

    .node-content {
        background: rgba(0, 0, 0, 0.4);
        border-radius: 8px;
        padding: 8px 10px;
        margin-bottom: 8px;
    }

    .code-preview {
        margin: 0;
        font-family: "JetBrains Mono", "Fira Code", monospace;
        font-size: 11px;
        line-height: 1.5;
        overflow-x: auto;
        white-space: pre-wrap;
        word-break: break-word;
    }

    .code-preview code {
        color: #c6d0f5;
    }

    .io-info {
        display: flex;
        gap: 12px;
        font-size: 10px;
        color: #6b7280;
    }

    .inputs {
        color: #f472b6;
    }

    .outputs {
        color: #34d399;
    }
</style>
