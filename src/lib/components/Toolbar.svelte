<script lang="ts">
    import {
        Play,
        Download,
        Trash2,
        Plus,
        CirclePlay,
        MonitorDown,
        Code2,
        Braces,
        RotateCcw,
    } from "@lucide/svelte";

    interface Props {
        onRun: () => void;
        onDownload: () => void;
        onClear: () => void;
        onAddNode: (type: "input" | "output" | "code" | "function") => void;
        onReset?: () => void;
        isRunning?: boolean;
        showAddNodes?: boolean;
        showReset?: boolean;
    }

    let {
        onRun,
        onDownload,
        onClear,
        onAddNode,
        onReset,
        isRunning = false,
        showAddNodes = true,
        showReset = false,
    }: Props = $props();

    let showNodeMenu = $state(false);
</script>

<div class="toolbar">
    <div class="toolbar-group">
        {#if showAddNodes}
            <div class="dropdown">
                <button
                    class="toolbar-btn add-btn"
                    onclick={() => (showNodeMenu = !showNodeMenu)}
                >
                    <Plus size={18} />
                    <span>Add Node</span>
                </button>
                {#if showNodeMenu}
                    <div class="dropdown-menu">
                        <button
                            onclick={() => {
                                onAddNode("input");
                                showNodeMenu = false;
                            }}
                        >
                            <CirclePlay size={14} />
                            <span>Input Node</span>
                        </button>
                        <button
                            onclick={() => {
                                onAddNode("output");
                                showNodeMenu = false;
                            }}
                        >
                            <MonitorDown size={14} />
                            <span>Output Node</span>
                        </button>
                        <button
                            onclick={() => {
                                onAddNode("code");
                                showNodeMenu = false;
                            }}
                        >
                            <Code2 size={14} />
                            <span>Code Node</span>
                        </button>
                        <button
                            onclick={() => {
                                onAddNode("function");
                                showNodeMenu = false;
                            }}
                        >
                            <Braces size={14} />
                            <span>Function Node</span>
                        </button>
                    </div>
                {/if}
            </div>
        {/if}

        {#if showReset && onReset}
            <button class="toolbar-btn reset-btn" onclick={onReset}>
                <RotateCcw size={18} />
                <span>Reset</span>
            </button>
        {/if}
    </div>

    <div class="toolbar-group">
        <button
            class="toolbar-btn run-btn"
            onclick={onRun}
            disabled={isRunning}
        >
            <Play size={18} />
            <span>{isRunning ? "Running..." : "Run"}</span>
        </button>

        <button class="toolbar-btn download-btn" onclick={onDownload}>
            <Download size={18} />
            <span>Download</span>
        </button>

        <button class="toolbar-btn clear-btn" onclick={onClear}>
            <Trash2 size={18} />
            <span>Clear</span>
        </button>
    </div>
</div>

<style>
    .toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 20px;
        background: linear-gradient(
            180deg,
            rgba(26, 26, 46, 0.98) 0%,
            rgba(15, 15, 26, 0.95) 100%
        );
        border-bottom: 1px solid rgba(99, 102, 241, 0.2);
        backdrop-filter: blur(10px);
    }

    .toolbar-group {
        display: flex;
        gap: 10px;
        align-items: center;
    }

    .toolbar-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 18px;
        border: none;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        background: rgba(255, 255, 255, 0.05);
        color: #e0e0e0;
    }

    .toolbar-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }

    .toolbar-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .add-btn {
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        color: white;
    }

    .add-btn:hover {
        background: linear-gradient(135deg, #818cf8 0%, #a78bfa 100%);
    }

    .run-btn {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
    }

    .run-btn:hover:not(:disabled) {
        background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
    }

    .download-btn {
        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        color: white;
    }

    .download-btn:hover {
        background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
    }

    .clear-btn {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        color: white;
    }

    .clear-btn:hover {
        background: linear-gradient(135deg, #f87171 0%, #ef4444 100%);
    }

    .reset-btn {
        background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
        color: white;
    }

    .reset-btn:hover {
        background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
    }

    .dropdown {
        position: relative;
    }

    .dropdown-menu {
        position: absolute;
        top: calc(100% + 8px);
        left: 0;
        background: rgba(26, 26, 46, 0.98);
        border: 1px solid rgba(99, 102, 241, 0.3);
        border-radius: 10px;
        padding: 8px;
        min-width: 180px;
        z-index: 100;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        animation: fadeIn 0.15s ease;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .dropdown-menu button {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        padding: 10px 14px;
        border: none;
        border-radius: 6px;
        background: transparent;
        color: #e0e0e0;
        font-size: 13px;
        cursor: pointer;
        transition: all 0.15s;
    }

    .dropdown-menu button:hover {
        background: rgba(99, 102, 241, 0.2);
        color: #fff;
    }
</style>
