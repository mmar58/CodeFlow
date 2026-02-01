<script lang="ts">
    import { Handle, Position } from "@xyflow/svelte";
    import type { OutputNodeData } from "$lib/types";
    import { CircleCheck, CircleX, MonitorDown } from "@lucide/svelte";

    interface Props {
        data: OutputNodeData;
        selected?: boolean;
    }

    let { data, selected = false }: Props = $props();

    const isCorrect = $derived(
        data.expectedValue !== undefined &&
            data.actualValue !== undefined &&
            data.actualValue === data.expectedValue,
    );

    const isWrong = $derived(
        data.expectedValue !== undefined &&
            data.actualValue !== undefined &&
            data.actualValue !== data.expectedValue,
    );
</script>

<div
    class="output-node"
    class:selected
    class:correct={isCorrect}
    class:wrong={isWrong}
>
    <Handle type="target" position={Position.Left} id="input" />
    <div class="node-header">
        <MonitorDown size={14} />
        <span class="node-label">{data.label}</span>
        {#if isCorrect}
            <CircleCheck size={16} class="status-icon correct" />
        {:else if isWrong}
            <CircleX size={16} class="status-icon wrong" />
        {/if}
    </div>
    <div class="node-content">
        {#if data.expectedValue}
            <div class="expected">
                <span class="label">Expected:</span>
                <code>{data.expectedValue}</code>
            </div>
        {/if}
        {#if data.actualValue !== undefined}
            <div class="actual">
                <span class="label">Actual:</span>
                <code>{data.actualValue}</code>
            </div>
        {:else}
            <div class="waiting">
                <span>Connect & run to see output</span>
            </div>
        {/if}
    </div>
</div>

<style>
    .output-node {
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        border: 2px solid #0f3460;
        border-radius: 12px;
        padding: 12px 16px;
        min-width: 180px;
        color: #e0e0e0;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        transition: all 0.2s ease;
    }

    .output-node:hover {
        border-color: #f39c12;
        transform: translateY(-2px);
    }

    .output-node.selected {
        border-color: #f39c12;
        box-shadow: 0 0 0 3px rgba(243, 156, 18, 0.3);
    }

    .output-node.correct {
        border-color: #27ae60;
        box-shadow: 0 0 20px rgba(39, 174, 96, 0.3);
    }

    .output-node.wrong {
        border-color: #e74c3c;
        box-shadow: 0 0 20px rgba(231, 76, 60, 0.3);
    }

    .node-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 10px;
        color: #f39c12;
    }

    .node-label {
        font-weight: 600;
        font-size: 13px;
        flex: 1;
    }

    :global(.status-icon.correct) {
        color: #27ae60;
    }

    :global(.status-icon.wrong) {
        color: #e74c3c;
    }

    .node-content {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .expected,
    .actual {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    .label {
        font-size: 10px;
        text-transform: uppercase;
        color: #888;
    }

    .expected code {
        font-family: "JetBrains Mono", "Fira Code", monospace;
        font-size: 11px;
        background: rgba(243, 156, 18, 0.1);
        padding: 4px 8px;
        border-radius: 4px;
        color: #f39c12;
    }

    .actual code {
        font-family: "JetBrains Mono", "Fira Code", monospace;
        font-size: 11px;
        background: rgba(46, 204, 113, 0.1);
        padding: 4px 8px;
        border-radius: 4px;
        color: #2ecc71;
    }

    .wrong .actual code {
        background: rgba(231, 76, 60, 0.1);
        color: #e74c3c;
    }

    .waiting {
        font-size: 11px;
        color: #666;
        font-style: italic;
        padding: 8px 0;
    }
</style>
