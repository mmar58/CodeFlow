<script lang="ts">
    import { Handle, Position } from "@xyflow/svelte";
    import type { FunctionNodeData } from "$lib/types";
    import { Braces } from "@lucide/svelte";

    interface Props {
        data: FunctionNodeData;
        selected?: boolean;
        onCodeChange?: (code: string) => void;
    }

    let { data, selected = false, onCodeChange }: Props = $props();

    let isEditing = $state(false);
    let editCode = $state(data.code);

    function handleSave() {
        if (onCodeChange) {
            onCodeChange(editCode);
        }
        isEditing = false;
    }

    function handleCancel() {
        editCode = data.code;
        isEditing = false;
    }
</script>

<div class="function-node" class:selected class:editing={isEditing}>
    <Handle type="target" position={Position.Left} id="input" />
    <div class="node-header">
        <Braces size={14} />
        <span class="node-label">{data.label}</span>
        {#if !isEditing}
            <button class="edit-btn" onclick={() => (isEditing = true)}
                >Edit</button
            >
        {/if}
    </div>
    <div class="node-content">
        {#if isEditing}
            <textarea
                bind:value={editCode}
                class="code-editor"
                rows="4"
                spellcheck="false"
            ></textarea>
            <div class="edit-actions">
                <button class="save-btn" onclick={handleSave}>Save</button>
                <button class="cancel-btn" onclick={handleCancel}>Cancel</button
                >
            </div>
        {:else}
            <pre class="code-preview"><code>{data.code}</code></pre>
        {/if}
    </div>
    <div class="io-info">
        {#if data.inputs.length > 0}
            <span class="inputs">
                inputs: {data.inputs.join(", ")}
            </span>
        {/if}
        {#if data.outputs.length > 0}
            <span class="outputs">
                outputs: {data.outputs.join(", ")}
            </span>
        {/if}
    </div>
    <Handle type="source" position={Position.Right} id="output" />
</div>

<style>
    .function-node {
        background: linear-gradient(135deg, #1a2f1a 0%, #1e3a2f 100%);
        border: 2px solid #10b981;
        border-radius: 12px;
        padding: 12px 16px;
        min-width: 220px;
        max-width: 300px;
        color: #e0e0e0;
        box-shadow: 0 4px 20px rgba(16, 185, 129, 0.2);
        transition: all 0.2s ease;
    }

    .function-node:hover {
        border-color: #34d399;
        transform: translateY(-2px);
    }

    .function-node.selected {
        border-color: #6ee7b7;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.3);
    }

    .function-node.editing {
        border-color: #f59e0b;
    }

    .node-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
        color: #34d399;
    }

    .node-label {
        font-weight: 600;
        font-size: 13px;
        flex: 1;
    }

    .edit-btn {
        font-size: 10px;
        padding: 3px 8px;
        border-radius: 4px;
        background: rgba(16, 185, 129, 0.2);
        color: #10b981;
        border: none;
        cursor: pointer;
        transition: all 0.15s;
    }

    .edit-btn:hover {
        background: rgba(16, 185, 129, 0.4);
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
        white-space: pre-wrap;
        word-break: break-word;
    }

    .code-preview code {
        color: #a7f3d0;
    }

    .code-editor {
        width: 100%;
        background: rgba(0, 0, 0, 0.5);
        border: 1px solid #10b981;
        border-radius: 6px;
        color: #a7f3d0;
        font-family: "JetBrains Mono", "Fira Code", monospace;
        font-size: 11px;
        padding: 8px;
        resize: vertical;
        outline: none;
    }

    .code-editor:focus {
        border-color: #6ee7b7;
    }

    .edit-actions {
        display: flex;
        gap: 6px;
        margin-top: 8px;
    }

    .save-btn,
    .cancel-btn {
        font-size: 10px;
        padding: 4px 10px;
        border-radius: 4px;
        border: none;
        cursor: pointer;
        transition: all 0.15s;
    }

    .save-btn {
        background: #10b981;
        color: white;
    }

    .save-btn:hover {
        background: #059669;
    }

    .cancel-btn {
        background: #4b5563;
        color: #e5e7eb;
    }

    .cancel-btn:hover {
        background: #6b7280;
    }

    .io-info {
        display: flex;
        gap: 12px;
        font-size: 10px;
        color: #6b7280;
    }

    .inputs {
        color: #fbbf24;
    }

    .outputs {
        color: #34d399;
    }
</style>
