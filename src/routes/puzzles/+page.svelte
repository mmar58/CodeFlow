<script lang="ts">
    import { puzzles } from "$lib/puzzles";
    import { ArrowRight, CheckCircle } from "@lucide/svelte";
</script>

<svelte:head>
    <title>Puzzles - CodeFlow</title>
    <meta
        name="description"
        content="Browse and solve visual programming puzzles to learn coding concepts."
    />
</svelte:head>

<div class="puzzles-page">
    <header class="page-header">
        <h1>Programming Puzzles</h1>
        <p>
            Select a puzzle to start learning. Complete them in order or jump to
            any challenge!
        </p>
    </header>

    <div class="difficulty-sections">
        <!-- Beginner -->
        <section class="difficulty-section">
            <h2 class="section-title beginner">
                <span class="dot"></span>
                Beginner
            </h2>
            <div class="puzzles-grid">
                {#each puzzles.filter((p) => p.difficulty === "beginner") as puzzle}
                    <a href="/puzzles/{puzzle.id}" class="puzzle-card">
                        <div class="puzzle-header">
                            <h3>{puzzle.title}</h3>
                            <span class="category">{puzzle.category}</span>
                        </div>
                        <p class="puzzle-description">{puzzle.description}</p>
                        <div class="puzzle-footer">
                            <span class="start-text">
                                <span>Start Puzzle</span>
                                <ArrowRight size={16} />
                            </span>
                        </div>
                    </a>
                {/each}
            </div>
        </section>

        <!-- Intermediate -->
        <section class="difficulty-section">
            <h2 class="section-title intermediate">
                <span class="dot"></span>
                Intermediate
            </h2>
            <div class="puzzles-grid">
                {#each puzzles.filter((p) => p.difficulty === "intermediate") as puzzle}
                    <a href="/puzzles/{puzzle.id}" class="puzzle-card">
                        <div class="puzzle-header">
                            <h3>{puzzle.title}</h3>
                            <span class="category">{puzzle.category}</span>
                        </div>
                        <p class="puzzle-description">{puzzle.description}</p>
                        <div class="puzzle-footer">
                            <span class="start-text">
                                <span>Start Puzzle</span>
                                <ArrowRight size={16} />
                            </span>
                        </div>
                    </a>
                {/each}
            </div>
        </section>

        <!-- Advanced -->
        <section class="difficulty-section">
            <h2 class="section-title advanced">
                <span class="dot"></span>
                Advanced
            </h2>
            <div class="puzzles-grid">
                {#each puzzles.filter((p) => p.difficulty === "advanced") as puzzle}
                    <a href="/puzzles/{puzzle.id}" class="puzzle-card">
                        <div class="puzzle-header">
                            <h3>{puzzle.title}</h3>
                            <span class="category">{puzzle.category}</span>
                        </div>
                        <p class="puzzle-description">{puzzle.description}</p>
                        <div class="puzzle-footer">
                            <span class="start-text">
                                <span>Start Puzzle</span>
                                <ArrowRight size={16} />
                            </span>
                        </div>
                    </a>
                {/each}
            </div>
        </section>
    </div>
</div>

<style>
    .puzzles-page {
        padding: 40px 60px;
        max-width: 1400px;
        margin: 0 auto;
    }

    .page-header {
        margin-bottom: 50px;
    }

    .page-header h1 {
        font-size: 36px;
        font-weight: 700;
        margin: 0 0 12px 0;
        background: linear-gradient(135deg, #fff 0%, #a5b4fc 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .page-header p {
        font-size: 16px;
        color: #9ca3af;
        margin: 0;
    }

    .difficulty-section {
        margin-bottom: 50px;
    }

    .section-title {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 20px;
        font-weight: 600;
        margin: 0 0 24px 0;
        color: #fff;
    }

    .section-title .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
    }

    .section-title.beginner .dot {
        background: #10b981;
    }
    .section-title.intermediate .dot {
        background: #f59e0b;
    }
    .section-title.advanced .dot {
        background: #ef4444;
    }

    .puzzles-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 20px;
    }

    .puzzle-card {
        display: flex;
        flex-direction: column;
        padding: 24px;
        background: linear-gradient(
            135deg,
            rgba(26, 26, 46, 0.8) 0%,
            rgba(15, 15, 26, 0.9) 100%
        );
        border: 1px solid rgba(99, 102, 241, 0.15);
        border-radius: 16px;
        text-decoration: none;
        color: inherit;
        transition: all 0.25s ease;
    }

    .puzzle-card:hover {
        transform: translateY(-4px);
        border-color: rgba(99, 102, 241, 0.4);
        box-shadow: 0 10px 40px rgba(99, 102, 241, 0.15);
    }

    .puzzle-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 12px;
    }

    .puzzle-header h3 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: #fff;
    }

    .category {
        font-size: 11px;
        padding: 4px 10px;
        border-radius: 10px;
        background: rgba(99, 102, 241, 0.15);
        color: #a5b4fc;
        text-transform: uppercase;
        font-weight: 500;
    }

    .puzzle-description {
        flex: 1;
        font-size: 14px;
        line-height: 1.6;
        color: #9ca3af;
        margin: 0 0 16px 0;
    }

    .puzzle-footer {
        display: flex;
        justify-content: flex-end;
    }

    .start-text {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
        font-weight: 500;
        color: #6366f1;
        transition: all 0.2s;
    }

    .puzzle-card:hover .start-text {
        color: #818cf8;
        gap: 10px;
    }
</style>
