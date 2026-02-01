<script lang="ts">
    import { Copy, Check, Download } from "@lucide/svelte";

    interface Props {
        code: string;
        errors?: string[];
        warnings?: string[];
        onDownload?: () => void;
    }

    let { code, errors = [], warnings = [], onDownload }: Props = $props();

    let copied = $state(false);

    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(code);
            copied = true;
            setTimeout(() => (copied = false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    }
</script>

<div class="code-preview">
    <div class="preview-header">
        <h3>Generated Code</h3>
        <div class="actions">
            <button class="action-btn" onclick={copyToClipboard}>
                {#if copied}
                    <Check size={14} />
                    <span>Copied!</span>
                {:else}
                    <Copy size={14} />
                    <span>Copy</span>
                {/if}
            </button>
            {#if onDownload}
                <button class="action-btn download" onclick={onDownload}>
                    <Download size={14} />
                    <span>Download</span>
                </button>
            {/if}
        </div>
    </div>

    {#if errors.length > 0}
        <div class="messages errors">
            {#each errors as error}
                <div class="message error">⚠️ {error}</div>
            {/each}
        </div>
    {/if}

    {#if warnings.length > 0}
        <div class="messages warnings">
            {#each warnings as warning}
                <div class="message warning">💡 {warning}</div>
            {/each}
        </div>
    {/if}

    <div class="code-container">
        <pre><code>{code || "// Connect nodes and run to generate code"}</code
            ></pre>
    </div>
</div>

<style>
    .code-preview {
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        border: 1px solid rgba(99, 102, 241, 0.2);
        border-radius: 12px;
        overflow: hidden;
    }

    .preview-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        background: rgba(0, 0, 0, 0.2);
        border-bottom: 1px solid rgba(99, 102, 241, 0.1);
    }

    .preview-header h3 {
        margin: 0;
        font-size: 14px;
        font-weight: 600;
        color: #e0e0e0;
    }

    .actions {
        display: flex;
        gap: 8px;
    }

    .action-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        border: none;
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.1);
        color: #e0e0e0;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.2s;
    }

    .action-btn:hover {
        background: rgba(99, 102, 241, 0.3);
    }

    .action-btn.download {
        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        color: white;
    }

    .action-btn.download:hover {
        background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
    }

    .messages {
        padding: 8px 16px;
    }

    .message {
        font-size: 12px;
        padding: 6px 10px;
        border-radius: 4px;
        margin-bottom: 4px;
    }

    .message.error {
        background: rgba(239, 68, 68, 0.1);
        color: #f87171;
    }

    .message.warning {
        background: rgba(245, 158, 11, 0.1);
        color: #fbbf24;
    }

    .code-container {
        padding: 16px;
        max-height: 400px;
        overflow: auto;
    }

    pre {
        margin: 0;
        font-family: "JetBrains Mono", "Fira Code", monospace;
        font-size: 12px;
        line-height: 1.6;
    }

    code {
        color: #c6d0f5;
    }
</style>
