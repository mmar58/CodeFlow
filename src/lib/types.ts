// Core types for the visual coding puzzle game

import type { Node, Edge } from '@xyflow/svelte';

// Node data types
export interface CodeNodeData {
    label: string;
    code: string;
    language: 'javascript' | 'python';
    description?: string;
    inputs: string[];
    outputs: string[];
    editable?: boolean;
}

export interface InputNodeData {
    label: string;
    value: string;
    valueType: 'string' | 'number' | 'array' | 'object';
}

export interface OutputNodeData {
    label: string;
    expectedValue?: string;
    actualValue?: string;
}

export interface FunctionNodeData {
    label: string;
    code: string;
    inputs: string[];
    outputs: string[];
}

// Custom node types
export type CodeNode = Node<CodeNodeData, 'code'>;
export type InputNode = Node<InputNodeData, 'input'>;
export type OutputNode = Node<OutputNodeData, 'output'>;
export type FunctionNode = Node<FunctionNodeData, 'function'>;

export type AppNode = CodeNode | InputNode | OutputNode | FunctionNode;
export type AppEdge = Edge;

// Puzzle types
export interface Puzzle {
    id: string;
    title: string;
    description: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    category: string;
    instructions: string[];
    hints: string[];
    initialNodes: AppNode[];
    initialEdges: AppEdge[];
    lockedNodes?: string[]; // IDs of nodes that can't be moved/deleted
    expectedOutput: string;
    validationFn?: string; // JavaScript function as string to validate
}

// Playground state
export interface PlaygroundState {
    nodes: AppNode[];
    edges: AppEdge[];
    savedAt?: Date;
    name?: string;
}

// Code generation result
export interface GeneratedCode {
    code: string;
    errors: string[];
    warnings: string[];
    executionOrder: string[]; // Node IDs in order
}

// Execution result
export interface ExecutionResult {
    success: boolean;
    output: string;
    error?: string;
    logs: string[];
}
