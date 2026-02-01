<script lang="ts">
	import "../app.css";
	import { Puzzle, Terminal, Github } from "@lucide/svelte";

	interface Props {
		children?: import("svelte").Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="app-container">
	<header class="app-header">
		<a href="/" class="logo">
			<div class="logo-icon">
				<Puzzle size={24} />
			</div>
			<span class="logo-text">CodeFlow</span>
		</a>

		<nav class="nav-links">
			<a href="/puzzles" class="nav-link">
				<Puzzle size={18} />
				<span>Puzzles</span>
			</a>
			<a href="/playground" class="nav-link">
				<Terminal size={18} />
				<span>Playground</span>
			</a>
		</nav>

		<div class="header-actions">
			<a
				href="https://github.com"
				target="_blank"
				rel="noopener noreferrer"
				class="github-link"
			>
				<Github size={20} />
			</a>
		</div>
	</header>

	<main class="app-main">
		{@render children?.()}
	</main>

	<footer class="app-footer">
		<p>Built with ❤️ using SvelteKit & Svelte Flow</p>
	</footer>
</div>

<style>
	:global(*, *::before, *::after) {
		box-sizing: border-box;
	}

	:global(html, body) {
		margin: 0;
		padding: 0;
		font-family:
			"Inter",
			-apple-system,
			BlinkMacSystemFont,
			"Segoe UI",
			Roboto,
			sans-serif;
		background: #0a0a14;
		color: #e0e0e0;
		min-height: 100vh;
	}

	.app-container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.app-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16px 32px;
		background: linear-gradient(
			180deg,
			rgba(15, 15, 26, 0.98) 0%,
			rgba(10, 10, 20, 0.95) 100%
		);
		border-bottom: 1px solid rgba(99, 102, 241, 0.15);
		backdrop-filter: blur(10px);
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 12px;
		text-decoration: none;
		color: inherit;
	}

	.logo-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 42px;
		height: 42px;
		background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
		border-radius: 12px;
		color: white;
	}

	.logo-text {
		font-size: 22px;
		font-weight: 700;
		background: linear-gradient(135deg, #fff 0%, #a5b4fc 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.nav-links {
		display: flex;
		gap: 8px;
	}

	.nav-link {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 18px;
		text-decoration: none;
		color: #9ca3af;
		font-size: 14px;
		font-weight: 500;
		border-radius: 10px;
		transition: all 0.2s;
	}

	.nav-link:hover {
		color: #fff;
		background: rgba(99, 102, 241, 0.15);
	}

	.header-actions {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.github-link {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: 10px;
		background: rgba(255, 255, 255, 0.05);
		color: #9ca3af;
		text-decoration: none;
		transition: all 0.2s;
	}

	.github-link:hover {
		background: rgba(255, 255, 255, 0.1);
		color: #fff;
	}

	.app-main {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.app-footer {
		padding: 24px;
		text-align: center;
		border-top: 1px solid rgba(255, 255, 255, 0.05);
		background: rgba(0, 0, 0, 0.2);
	}

	.app-footer p {
		margin: 0;
		font-size: 13px;
		color: #6b7280;
	}
</style>
