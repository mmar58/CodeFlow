# Contributing to CodeFlow

Thank you for your interest in contributing to CodeFlow! We welcome contributions from the community to help us expand the game with new puzzles, features, and improvements.

Since this is a static web application, contributing is as simple as adding new content to the source files and submitting a Pull Request.

## 🚀 How to Contribute

1.  **Fork the repository** on GitHub.
2.  **Clone your fork** locally:
    ```bash
    git clone https://github.com/yourusername/codeflow.git
    cd codeflow
    ```
3.  **Create a new branch**:
    ```bash
    git checkout -b feature/my-new-puzzle
    ```
4.  **Make your changes** (see guides below on adding content).
5.  **Test your changes**:
    ```bash
    pnpm run dev
    ```
6.  **Commit and Push**:
    ```bash
    git add .
    git commit -m "Add new array puzzle"
    git push origin feature/my-new-puzzle
    ```
7.  **Open a Pull Request** against the main repository.

---

## 🧩 Adding New Puzzles

Puzzles are defined in `src/lib/puzzles.ts`. To add a new level:

1.  Open `src/lib/puzzles.ts`.
2.  Add a new `Puzzle` object to the `puzzles` array.

### Puzzle Structure

```typescript
{
  id: 'unique-id',            // URL-friendly ID (e.g., 'reverse-array')
  title: 'Puzzle Title',      // Display name
  description: 'Goal...',     // Short description for the card
  difficulty: 'beginner',     // 'beginner' | 'intermediate' | 'advanced'
  category: 'logic',          // Category tag (e.g., 'math', 'string', 'array')
  instructions: [             // Step-by-step instructions shown in the sidebar
    'Step 1: Do this',
    'Step 2: Do that'
  ],
  hints: [                    // Optional hints for the user
    'Try using the generic function node',
  ],
  initialNodes: [ ... ],      // Array of starting nodes
  initialEdges: [ ... ],      // Array of starting connections (usually empty)
  expectedOutput: 'Result'    // The string value required to pass the level
}
```

### Pro Tip: Generating Coordinates
Writing JSON for node coordinates manually is hard. Instead:
1.  Run the app locally (`pnpm run dev`).
2.  Go to the **Playground**.
3.  Build your puzzle layout visually using the drag-and-drop editor.
4.  Open the browser console (F12).
5.  Run this command to copy the JSON:
    ```javascript
    copy(JSON.parse(localStorage.getItem('playground-state')).nodes)
    ```
6.  Paste the result into `initialNodes` in your puzzle definition.

---

## ⚡ Adding New Node Types

Want to add a new block type, like a "Math" or "Loop" node?

### 1. Update Types (`src/lib/types.ts`)

Add the data interface and update update the `AppNode` union type.

```typescript
// src/lib/types.ts
export interface MathNodeData extends Record<string, unknown> {
  operation: 'add' | 'subtract';
  label: string;
}

// Add to AppNode type
export type AppNode = 
  | Node<InputNodeData, 'input'> 
  | Node<MathNodeData, 'math'> // Add your new type
  | ...
```

### 2. Create Component (`src/lib/components/nodes/`)

Create a Svelte component (e.g., `MathNode.svelte`). It should accept `data` and handle Svelte Files handles.

```svelte
<!-- src/lib/components/nodes/MathNode.svelte -->
<script lang="ts">
  import { Handle, Position } from '@xyflow/svelte';
  export let data;
</script>

<div class="node-box">
  <Handle type="target" position={Position.Left} />
  <div>{data.label}</div>
  <Handle type="source" position={Position.Right} />
</div>
```

### 3. Register Node (`src/lib/components/NodeEditor.svelte`)

Import your component and add it to the `nodeTypes` object.

```typescript
// src/lib/components/NodeEditor.svelte
import MathNode from './nodes/MathNode.svelte';

const nodeTypes: NodeTypes = {
  // ...
  math: MathNode, // Register here
};
```

### 4. Update Code Generator (`src/lib/codeGenerator.ts`)

Teach the engine how to convert your node into JavaScript code.

```typescript
// src/lib/codeGenerator.ts

// Inside the generateCode loop:
if (node.type === 'math') {
  // Logic to find input variables and generate the line of code
  const inputVars = ... 
  lines.push(`const ${varName} = ${inputVars[0]} + ${inputVars[1]};`);
}
```

---

## 🐛 Bug Reports & Improvements

Found a bug or have an idea for the playground?
- Open an **Issue** on GitHub.
- Be specific about steps to reproduce bugs.
- For feature requests, explain the "why" and "how" it improves the game.

Happy Coding! 🚀
