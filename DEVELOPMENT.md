# Developer Guide: Adding Content

This guide explains how to add new puzzles (levels) and create new node types for CodeFlow.

## Adding New Puzzles

Puzzles are defined in `src/lib/puzzles.ts`. To add a new level:

1.  Open `src/lib/puzzles.ts`.
2.  Add a new `Puzzle` object to the `puzzles` array.

### Puzzle Structure

```typescript
{
  id: 'unique-id',            // Unique identifier for URL
  title: 'Puzzle Title',      // Display name
  description: 'Goal...',     // Short description
  difficulty: 'beginner',     // 'beginner' | 'intermediate' | 'advanced'
  category: 'logic',          // Category tag
  instructions: [             // Step-by-step instructions
    'Step 1: Do this',
    'Step 2: Do that'
  ],
  hints: [                    // Optional hints
    'Hint 1',
  ],
  initialNodes: [ ... ],      // Array of starting nodes
  initialEdges: [ ... ],      // Array of starting connections (usually empty)
  expectedOutput: 'Result'    // The string value needed to win
}
```

### Tip for Coordinates
When defining `initialNodes`, you need x/y coordinates. The easiest way to get these is to:
1. Go to the **Playground**.
2. Build your puzzle layout visually.
3. Open the browser console (F12).
4. Run `copy(localStorage.getItem('playground-state'))`.
5. Paste the JSON and extract the `nodes` array.

## Adding New Node Types

Adding a new node type (e.g., a "Math" node) involves 3 steps:

### 1. Update Types (`src/lib/types.ts`)

Add usage definition to the `AppNode` union type or create a specific interface if it has custom data.

```typescript
// src/lib/types.ts
export interface MathNodeData extends Record<string, unknown> {
  operation: 'add' | 'subtract';
  label: string;
}

// Add to AppNode type
export type AppNode = 
  | Node<InputNodeData, 'input'> 
  | Node<MathNodeData, 'math'> // Add this
  | ...
```

### 2. Create Component (`src/lib/components/nodes/`)

Create `MathNode.svelte`. It must accept `data` prop and handle connections.

```svelte
<!-- src/lib/components/nodes/MathNode.svelte -->
<script lang="ts">
  import { Handle, Position } from '@xyflow/svelte';
  export let data;
</script>

<div class="math-node">
  <Handle type="target" position={Position.Left} />
  <div>{data.label}</div>
  <Handle type="source" position={Position.Right} />
</div>
```

### 3. Register Node (`src/lib/components/NodeEditor.svelte`)

Import your component and add it to `nodeTypes`.

```typescript
// src/lib/components/NodeEditor.svelte
import MathNode from './nodes/MathNode.svelte';

const nodeTypes: NodeTypes = {
  // ...
  math: MathNode, // Register here
};
```

### 4. Update Code Generator (`src/lib/codeGenerator.ts`)

Teach the engine how to convert your node into JavaScript.

```typescript
// src/lib/codeGenerator.ts

// Inside generateCode function loop:
if (node.type === 'math') {
  // Find input variable names
  const inputVars = ... 
  
  lines.push(`const ${varName} = ${inputVars[0]} + ${inputVars[1]};`);
}
```
