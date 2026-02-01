<script lang="ts">
    import { Lightbulb, CheckCircle, XCircle, Info } from "@lucide/svelte";
    import type { Puzzle } from "$lib/types";

    interface Props {
        puzzle: Puzzle;
        isComplete?: boolean;
        showHints?: boolean;
        currentResult?: string;
    }

    let {
        puzzle,
        isComplete = false,
        showHints = false,
        currentResult,
    }: Props = $props();

    let hintsExpanded = $state(false);
</script>

<div class="puzzle-info" class:complete={isComplete}>
    <div class="puzzle-header">
        <div class="title-section">
            <h2>{puzzle.title}</h2>
            <span class="difficulty" data-level={puzzle.difficulty}>
                {puzzle.difficulty}
            </span>
        </div>
        {#if isComplete}
            <div class="status success">
                <CheckCircle size={20} />
                <span>Completed!</span>
            </div>
        {:else if currentResult !== undefined}
            <div class="status failure">
                <XCircle size={20} />
                <span>Not quite right</span>
            </div>
        {/if}
    </div>

    <p class="description">{puzzle.description}</p>

    <div class="instructions">
        <h3>
            <Info size={16} />
            Instructions
        </h3>
        <ol>
            {#each puzzle.instructions as instruction}
                <li>{instruction}</li>
            {/each}
        </ol>
    </div>

    <div class="expected">
        <span class="label">Expected Output:</span>
        <code>{puzzle.expectedOutput}</code>
    </div>

    {#if currentResult !== undefined}
        <div class="result" class:correct={isComplete}>
            <span class="label">Your Result:</span>
            <code>{currentResult}</code>
        </div>
    {/if}

    {#if showHints && puzzle.hints.length > 0}
        <div class="hints-section">
            <button
                class="hints-toggle"
                onclick={() => (hintsExpanded = !hintsExpanded)}
            >
                <Lightbulb size={16} />
                <span>{hintsExpanded ? "Hide Hints" : "Show Hints"}</span>
            </button>

            {#if hintsExpanded}
                <ul class="hints-list">
                    {#each puzzle.hints as hint}
                        <li>{hint}</li>
                    {/each}
                </ul>
            {/if}
        </div>
    {/if}
</div>

<style>
    .puzzle-info {
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        border: 1px solid rgba(99, 102, 241, 0.2);
        border-radius: 16px;
        padding: 24px;
        color: #e0e0e0;
    }

    .puzzle-info.complete {
        border-color: rgba(16, 185, 129, 0.5);
        box-shadow: 0 0 30px rgba(16, 185, 129, 0.1);
    }

    .puzzle-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 16px;
    }

    .title-section {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .title-section h2 {
        margin: 0;
        font-size: 20px;
        font-weight: 700;
        background: linear-gradient(135deg, #fff 0%, #a5b4fc 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .difficulty {
        font-size: 11px;
        padding: 4px 10px;
        border-radius: 12px;
        text-transform: uppercase;
        font-weight: 600;
    }

    .difficulty[data-level="beginner"] {
        background: rgba(16, 185, 129, 0.2);
        color: #10b981;
    }

    .difficulty[data-level="intermediate"] {
        background: rgba(245, 158, 11, 0.2);
        color: #f59e0b;
    }

    .difficulty[data-level="advanced"] {
        background: rgba(239, 68, 68, 0.2);
        color: #ef4444;
    }

    .status {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px 14px;
        border-radius: 20px;
        font-size: 13px;
        font-weight: 500;
    }

    .status.success {
        background: rgba(16, 185, 129, 0.2);
        color: #10b981;
    }

    .status.failure {
        background: rgba(239, 68, 68, 0.2);
        color: #ef4444;
    }

    .description {
        color: #9ca3af;
        line-height: 1.6;
        margin-bottom: 20px;
    }

    .instructions {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        padding: 16px;
        margin-bottom: 16px;
    }

    .instructions h3 {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 0 0 12px 0;
        font-size: 14px;
        color: #6366f1;
    }

    .instructions ol {
        margin: 0;
        padding-left: 20px;
    }

    .instructions li {
        margin-bottom: 8px;
        line-height: 1.5;
        color: #d1d5db;
    }

    .expected,
    .result {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 16px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 8px;
        margin-bottom: 10px;
    }

    .label {
        font-size: 12px;
        color: #9ca3af;
    }

    .expected code {
        font-family: "JetBrains Mono", "Fira Code", monospace;
        background: rgba(99, 102, 241, 0.2);
        color: #a5b4fc;
        padding: 4px 10px;
        border-radius: 4px;
        font-size: 13px;
    }

    .result code {
        font-family: "JetBrains Mono", "Fira Code", monospace;
        background: rgba(239, 68, 68, 0.2);
        color: #f87171;
        padding: 4px 10px;
        border-radius: 4px;
        font-size: 13px;
    }

    .result.correct code {
        background: rgba(16, 185, 129, 0.2);
        color: #34d399;
    }

    .hints-section {
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid rgba(255, 255, 255, 0.05);
    }

    .hints-toggle {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 14px;
        border: none;
        border-radius: 8px;
        background: rgba(245, 158, 11, 0.1);
        color: #f59e0b;
        font-size: 13px;
        cursor: pointer;
        transition: all 0.2s;
    }

    .hints-toggle:hover {
        background: rgba(245, 158, 11, 0.2);
    }

    .hints-list {
        margin: 12px 0 0 0;
        padding-left: 20px;
    }

    .hints-list li {
        color: #fbbf24;
        margin-bottom: 8px;
        line-height: 1.5;
    }
</style>
