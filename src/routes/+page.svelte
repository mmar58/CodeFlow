<script lang="ts">
    import {
        Puzzle,
        Terminal,
        Sparkles,
        ArrowRight,
        Zap,
        Download,
        Code2,
    } from "@lucide/svelte";
</script>

<svelte:head>
    <title>CodeFlow - Visual Programming Puzzles</title>
    <meta
        name="description"
        content="Learn programming concepts through visual node-based puzzles. Connect code blocks, solve challenges, and build scripts."
    />
</svelte:head>

<div class="landing">
    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-content">
            <div class="hero-badge">
                <Sparkles size={14} />
                <span>Visual Programming Made Fun</span>
            </div>
            <h1>
                Learn to Code by
                <span class="gradient-text">Connecting the Dots</span>
            </h1>
            <p class="hero-description">
                Master programming concepts through interactive visual puzzles.
                Connect nodes, see the flow, and understand how code works.
            </p>
            <div class="hero-actions">
                <a href="/puzzles" class="btn btn-primary">
                    <Puzzle size={20} />
                    <span>Start Puzzles</span>
                    <ArrowRight size={18} />
                </a>
                <a href="/playground" class="btn btn-secondary">
                    <Terminal size={20} />
                    <span>Open Playground</span>
                </a>
            </div>
        </div>

        <div class="hero-visual">
            <div class="node-preview">
                <div class="preview-node input-node">
                    <span class="node-dot green"></span>
                    <span>Input: 5</span>
                </div>
                <svg class="connection-line" viewBox="0 0 100 50">
                    <path
                        d="M10 25 Q50 25 90 25"
                        stroke="url(#gradient)"
                        stroke-width="3"
                        fill="none"
                    />
                    <defs>
                        <linearGradient
                            id="gradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                        >
                            <stop offset="0%" style="stop-color:#4ecca3" />
                            <stop offset="100%" style="stop-color:#6366f1" />
                        </linearGradient>
                    </defs>
                </svg>
                <div class="preview-node code-node">
                    <span class="node-dot purple"></span>
                    <span>x * 2</span>
                </div>
                <svg class="connection-line" viewBox="0 0 100 50">
                    <path
                        d="M10 25 Q50 25 90 25"
                        stroke="url(#gradient2)"
                        stroke-width="3"
                        fill="none"
                    />
                    <defs>
                        <linearGradient
                            id="gradient2"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                        >
                            <stop offset="0%" style="stop-color:#6366f1" />
                            <stop offset="100%" style="stop-color:#f39c12" />
                        </linearGradient>
                    </defs>
                </svg>
                <div class="preview-node output-node">
                    <span class="node-dot orange"></span>
                    <span>Result: 10</span>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="features">
        <h2>Why CodeFlow?</h2>
        <div class="features-grid">
            <div class="feature-card">
                <div class="feature-icon">
                    <Puzzle size={28} />
                </div>
                <h3>Interactive Puzzles</h3>
                <p>
                    Solve progressively challenging puzzles that teach real
                    programming concepts through visual connections.
                </p>
            </div>

            <div class="feature-card">
                <div class="feature-icon">
                    <Code2 size={28} />
                </div>
                <h3>See Your Code</h3>
                <p>
                    Watch as your node connections transform into real,
                    executable JavaScript code in real-time.
                </p>
            </div>

            <div class="feature-card">
                <div class="feature-icon">
                    <Terminal size={28} />
                </div>
                <h3>Playground Mode</h3>
                <p>
                    Create your own code snippets, connect them together, and
                    build custom scripts from scratch.
                </p>
            </div>

            <div class="feature-card">
                <div class="feature-icon">
                    <Download size={28} />
                </div>
                <h3>Export & Run</h3>
                <p>
                    Download your generated scripts and run them locally. Real
                    code, ready to use.
                </p>
            </div>

            <div class="feature-card">
                <div class="feature-icon">
                    <Zap size={28} />
                </div>
                <h3>Instant Feedback</h3>
                <p>
                    Run your solutions instantly and see whether they produce
                    the expected results.
                </p>
            </div>

            <div class="feature-card">
                <div class="feature-icon">
                    <Sparkles size={28} />
                </div>
                <h3>Beautiful Design</h3>
                <p>
                    A stunning dark interface with smooth animations that makes
                    coding feel magical.
                </p>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
        <div class="cta-content">
            <h2>Ready to Start Coding?</h2>
            <p>
                Jump into the puzzles and learn by doing, or explore the
                playground for unlimited creativity.
            </p>
            <div class="cta-actions">
                <a href="/puzzles" class="btn btn-primary">
                    <span>Start Learning</span>
                    <ArrowRight size={18} />
                </a>
            </div>
        </div>
    </section>
</div>

<style>
    .landing {
        min-height: 100%;
    }

    /* Hero Section */
    .hero {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 60px;
        padding: 80px 60px;
        max-width: 1400px;
        margin: 0 auto;
        align-items: center;
    }

    .hero-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        background: rgba(99, 102, 241, 0.15);
        border: 1px solid rgba(99, 102, 241, 0.3);
        border-radius: 20px;
        color: #a5b4fc;
        font-size: 13px;
        font-weight: 500;
        margin-bottom: 24px;
    }

    .hero h1 {
        font-size: 52px;
        font-weight: 800;
        line-height: 1.15;
        margin: 0 0 24px 0;
        color: #fff;
    }

    .gradient-text {
        background: linear-gradient(
            135deg,
            #6366f1 0%,
            #a855f7 50%,
            #ec4899 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .hero-description {
        font-size: 18px;
        line-height: 1.7;
        color: #9ca3af;
        margin-bottom: 36px;
        max-width: 520px;
    }

    .hero-actions {
        display: flex;
        gap: 16px;
    }

    .btn {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 14px 28px;
        border-radius: 12px;
        font-size: 15px;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.25s ease;
        cursor: pointer;
        border: none;
    }

    .btn-primary {
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        color: white;
        box-shadow: 0 4px 20px rgba(99, 102, 241, 0.3);
    }

    .btn-primary:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 30px rgba(99, 102, 241, 0.4);
    }

    .btn-secondary {
        background: rgba(255, 255, 255, 0.05);
        color: #e0e0e0;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.2);
    }

    .hero-visual {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .node-preview {
        display: flex;
        align-items: center;
        gap: 0;
        padding: 40px;
        background: linear-gradient(
            135deg,
            rgba(26, 26, 46, 0.8) 0%,
            rgba(15, 15, 26, 0.9) 100%
        );
        border: 1px solid rgba(99, 102, 241, 0.2);
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
    }

    .preview-node {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 14px 20px;
        background: rgba(0, 0, 0, 0.4);
        border-radius: 10px;
        font-family: "JetBrains Mono", monospace;
        font-size: 14px;
        white-space: nowrap;
    }

    .node-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
    }

    .node-dot.green {
        background: #4ecca3;
    }
    .node-dot.purple {
        background: #6366f1;
    }
    .node-dot.orange {
        background: #f39c12;
    }

    .input-node {
        border: 2px solid #4ecca3;
    }
    .code-node {
        border: 2px solid #6366f1;
    }
    .output-node {
        border: 2px solid #f39c12;
    }

    .connection-line {
        width: 60px;
        height: 30px;
    }

    /* Features Section */
    .features {
        padding: 80px 60px;
        background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.2) 0%,
            transparent 100%
        );
    }

    .features h2 {
        text-align: center;
        font-size: 36px;
        font-weight: 700;
        margin: 0 0 50px 0;
        color: #fff;
    }

    .features-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
        max-width: 1200px;
        margin: 0 auto;
    }

    .feature-card {
        padding: 32px;
        background: linear-gradient(
            135deg,
            rgba(26, 26, 46, 0.6) 0%,
            rgba(15, 15, 26, 0.8) 100%
        );
        border: 1px solid rgba(99, 102, 241, 0.1);
        border-radius: 16px;
        transition: all 0.3s ease;
    }

    .feature-card:hover {
        transform: translateY(-5px);
        border-color: rgba(99, 102, 241, 0.3);
        box-shadow: 0 10px 40px rgba(99, 102, 241, 0.1);
    }

    .feature-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 56px;
        height: 56px;
        background: linear-gradient(
            135deg,
            rgba(99, 102, 241, 0.2) 0%,
            rgba(168, 85, 247, 0.2) 100%
        );
        border-radius: 14px;
        color: #a5b4fc;
        margin-bottom: 20px;
    }

    .feature-card h3 {
        font-size: 18px;
        font-weight: 600;
        margin: 0 0 12px 0;
        color: #fff;
    }

    .feature-card p {
        font-size: 14px;
        line-height: 1.6;
        color: #9ca3af;
        margin: 0;
    }

    /* CTA Section */
    .cta {
        padding: 100px 60px;
        text-align: center;
        background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(99, 102, 241, 0.05) 100%
        );
    }

    .cta-content {
        max-width: 600px;
        margin: 0 auto;
    }

    .cta h2 {
        font-size: 36px;
        font-weight: 700;
        margin: 0 0 16px 0;
        color: #fff;
    }

    .cta p {
        font-size: 17px;
        line-height: 1.7;
        color: #9ca3af;
        margin: 0 0 32px 0;
    }

    .cta-actions {
        display: flex;
        justify-content: center;
    }

    /* Responsive */
    @media (max-width: 1024px) {
        .hero {
            grid-template-columns: 1fr;
            text-align: center;
            padding: 60px 30px;
        }

        .hero-description {
            max-width: 100%;
        }

        .hero-actions {
            justify-content: center;
        }

        .features-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 768px) {
        .hero h1 {
            font-size: 36px;
        }

        .features-grid {
            grid-template-columns: 1fr;
        }

        .hero-actions {
            flex-direction: column;
            align-items: center;
        }
    }
</style>
