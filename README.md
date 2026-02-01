# CodeFlow - Visual Coding Puzzle Game

[![Netlify Status](https://api.netlify.com/api/v1/badges/b3334234-2223-4444-8888-1234567890/deploy-status)](https://app.netlify.com/sites/codeflowpuzzle/deploys)

A visual programming puzzle game where you connect nodes to solve coding challenges. Built with SvelteKit and Svelte Flow.

[**Play Online**](https://codeflowpuzzle.netlify.app/)

## Live Demo

<iframe src="https://codeflowpuzzle.netlify.app/" width="100%" height="600px" style="border:0; border-radius: 12px; overflow:hidden;" title="CodeFlow Demo"></iframe>

> *Note: If the interactive demo doesn't load above, click the "Play Online" link.*

## Features

*   **🧩 Puzzle Mode**: Solve logic puzzles by connecting input, function, and output nodes.
*   **🛠️ Playground**: Free-form environment to build and test your own node graphs.
*   **⚡ Real-time Execution**: See the results of your visual code instantly.
*   **🔌 Svelte Flow Integration**: Smooth, performant node-based UI.
*   **💾 Auto-save**: Your progress in the playground is saved automatically.
*   **📥 Export Code**: Download your visual graphs as executable JavaScript files.

## Tech Stack

*   **Framework**: [SvelteKit](https://kit.svelte.dev/)
*   **Visual Engine**: [Svelte Flow](https://svelteflow.dev/) (xyflow)
*   **Styling**: Tailwind CSS, Lucide Icons
*   **Deployment**: Static Adapter (Netlify)

## Local Development

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/codeflow.git
    cd codeflow
    ```

2.  Install dependencies:
    ```bash
    pnpm install
    ```

3.  Start the development server:
    ```bash
    pnpm run dev
    ```

4.  Open `http://localhost:5173` in your browser.

## Extending the Game

Want to create your own levels or add new node types? Check out our [Contribution Guide](CONTRIBUTING.md).
