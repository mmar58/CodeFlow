// Predefined puzzles for the game

import type { Puzzle } from './types';

export const puzzles: Puzzle[] = [
    {
        id: 'hello-world',
        title: 'Hello World',
        description: 'Your first puzzle! Connect the input to the output to display a greeting.',
        difficulty: 'beginner',
        category: 'basics',
        instructions: [
            'Connect the "Greeting" input to the "Display" output',
            'Click Run to see the result'
        ],
        hints: [
            'Drag from the output handle (right side) of the input node',
            'Drop onto the input handle (left side) of the output node'
        ],
        initialNodes: [
            {
                id: 'input-1',
                type: 'input',
                position: { x: 100, y: 150 },
                data: {
                    label: 'Greeting',
                    value: 'Hello, World!',
                    valueType: 'string'
                }
            },
            {
                id: 'output-1',
                type: 'output',
                position: { x: 450, y: 150 },
                data: {
                    label: 'Display',
                    expectedValue: 'Hello, World!'
                }
            }
        ],
        initialEdges: [],
        expectedOutput: 'Hello, World!'
    },
    {
        id: 'add-numbers',
        title: 'Add Two Numbers',
        description: 'Connect the inputs to the add function, then connect to output.',
        difficulty: 'beginner',
        category: 'math',
        instructions: [
            'Connect both number inputs to the "Add" function',
            'Connect the "Add" function to the output',
            'The result should be 15'
        ],
        hints: [
            'The Add function needs both inputs connected',
            'Make sure to connect the function output to the display'
        ],
        initialNodes: [
            {
                id: 'input-a',
                type: 'input',
                position: { x: 100, y: 80 },
                data: {
                    label: 'Number A',
                    value: '5',
                    valueType: 'number'
                }
            },
            {
                id: 'input-b',
                type: 'input',
                position: { x: 100, y: 220 },
                data: {
                    label: 'Number B',
                    value: '10',
                    valueType: 'number'
                }
            },
            {
                id: 'func-add',
                type: 'code',
                position: { x: 320, y: 150 },
                data: {
                    label: 'Add',
                    code: 'return input[0] + input[1];',
                    language: 'javascript',
                    description: 'Adds two numbers together',
                    inputs: ['a', 'b'],
                    outputs: ['sum'],
                    editable: false
                }
            },
            {
                id: 'output-1',
                type: 'output',
                position: { x: 550, y: 150 },
                data: {
                    label: 'Result',
                    expectedValue: '15'
                }
            }
        ],
        initialEdges: [],
        expectedOutput: '15'
    },
    {
        id: 'array-map',
        title: 'Transform Array',
        description: 'Use the map function to double all numbers in the array.',
        difficulty: 'intermediate',
        category: 'arrays',
        instructions: [
            'Connect the array input to the "Double Each" function',
            'Connect the function to the output',
            'Each number should be multiplied by 2'
        ],
        hints: [
            'The map function transforms each element',
            'Expected result: [2, 4, 6, 8, 10]'
        ],
        initialNodes: [
            {
                id: 'input-arr',
                type: 'input',
                position: { x: 100, y: 150 },
                data: {
                    label: 'Numbers',
                    value: '[1, 2, 3, 4, 5]',
                    valueType: 'array'
                }
            },
            {
                id: 'func-map',
                type: 'code',
                position: { x: 320, y: 150 },
                data: {
                    label: 'Double Each',
                    code: 'return input[0].map(n => n * 2);',
                    language: 'javascript',
                    description: 'Doubles each number in the array',
                    inputs: ['array'],
                    outputs: ['result'],
                    editable: false
                }
            },
            {
                id: 'output-1',
                type: 'output',
                position: { x: 550, y: 150 },
                data: {
                    label: 'Result',
                    expectedValue: '[2, 4, 6, 8, 10]'
                }
            }
        ],
        initialEdges: [],
        expectedOutput: '[2,4,6,8,10]'
    },
    {
        id: 'filter-sort',
        title: 'Filter and Sort',
        description: 'Chain functions to filter even numbers and sort them.',
        difficulty: 'intermediate',
        category: 'arrays',
        instructions: [
            'Connect the array to "Filter Even" first',
            'Connect "Filter Even" to "Sort Ascending"',
            'Connect the result to output'
        ],
        hints: [
            'Data flows left to right',
            'Filter removes odd numbers, Sort orders them'
        ],
        initialNodes: [
            {
                id: 'input-arr',
                type: 'input',
                position: { x: 50, y: 150 },
                data: {
                    label: 'Numbers',
                    value: '[8, 3, 12, 5, 2, 9, 6]',
                    valueType: 'array'
                }
            },
            {
                id: 'func-filter',
                type: 'code',
                position: { x: 250, y: 150 },
                data: {
                    label: 'Filter Even',
                    code: 'return input[0].filter(n => n % 2 === 0);',
                    language: 'javascript',
                    description: 'Keeps only even numbers',
                    inputs: ['array'],
                    outputs: ['filtered'],
                    editable: false
                }
            },
            {
                id: 'func-sort',
                type: 'code',
                position: { x: 470, y: 150 },
                data: {
                    label: 'Sort Ascending',
                    code: 'return [...input[0]].sort((a, b) => a - b);',
                    language: 'javascript',
                    description: 'Sorts numbers from smallest to largest',
                    inputs: ['array'],
                    outputs: ['sorted'],
                    editable: false
                }
            },
            {
                id: 'output-1',
                type: 'output',
                position: { x: 700, y: 150 },
                data: {
                    label: 'Result',
                    expectedValue: '[2, 6, 8, 12]'
                }
            }
        ],
        initialEdges: [],
        expectedOutput: '[2,6,8,12]'
    },
    {
        id: 'string-manipulation',
        title: 'String Transformer',
        description: 'Transform a string by applying multiple operations in sequence.',
        difficulty: 'advanced',
        category: 'strings',
        instructions: [
            'Connect the input text to "Uppercase"',
            'Connect "Uppercase" to "Reverse"',
            'Connect "Reverse" to the output',
            'The result should be "DLROW OLLEH"'
        ],
        hints: [
            'Each function processes the string and passes it to the next',
            'Uppercase converts to capital letters, Reverse flips the string'
        ],
        initialNodes: [
            {
                id: 'input-str',
                type: 'input',
                position: { x: 50, y: 150 },
                data: {
                    label: 'Text',
                    value: 'hello world',
                    valueType: 'string'
                }
            },
            {
                id: 'func-upper',
                type: 'code',
                position: { x: 240, y: 150 },
                data: {
                    label: 'Uppercase',
                    code: 'return input[0].toUpperCase();',
                    language: 'javascript',
                    description: 'Converts text to uppercase',
                    inputs: ['text'],
                    outputs: ['result'],
                    editable: false
                }
            },
            {
                id: 'func-reverse',
                type: 'code',
                position: { x: 450, y: 150 },
                data: {
                    label: 'Reverse',
                    code: 'return input[0].split("").reverse().join("");',
                    language: 'javascript',
                    description: 'Reverses the string',
                    inputs: ['text'],
                    outputs: ['result'],
                    editable: false
                }
            },
            {
                id: 'output-1',
                type: 'output',
                position: { x: 670, y: 150 },
                data: {
                    label: 'Result',
                    expectedValue: 'DLROW OLLEH'
                }
            }
        ],
        initialEdges: [],
        expectedOutput: 'DLROW OLLEH'
    },
    {
        id: 'compose-functions',
        title: 'Function Composition',
        description: 'Create a complex transformation by composing multiple functions.',
        difficulty: 'advanced',
        category: 'functions',
        instructions: [
            'Connect inputs to the appropriate functions',
            'Chain the functions to produce the final calculation',
            'Calculate: (a + b) * c where a=5, b=3, c=2'
        ],
        hints: [
            'First add a and b',
            'Then multiply the sum by c',
            'Expected: 16'
        ],
        initialNodes: [
            {
                id: 'input-a',
                type: 'input',
                position: { x: 50, y: 50 },
                data: {
                    label: 'A',
                    value: '5',
                    valueType: 'number'
                }
            },
            {
                id: 'input-b',
                type: 'input',
                position: { x: 50, y: 150 },
                data: {
                    label: 'B',
                    value: '3',
                    valueType: 'number'
                }
            },
            {
                id: 'input-c',
                type: 'input',
                position: { x: 50, y: 250 },
                data: {
                    label: 'C',
                    value: '2',
                    valueType: 'number'
                }
            },
            {
                id: 'func-add',
                type: 'code',
                position: { x: 250, y: 100 },
                data: {
                    label: 'Add',
                    code: 'return input[0] + input[1];',
                    language: 'javascript',
                    description: 'Adds two numbers',
                    inputs: ['a', 'b'],
                    outputs: ['sum'],
                    editable: false
                }
            },
            {
                id: 'func-multiply',
                type: 'code',
                position: { x: 450, y: 170 },
                data: {
                    label: 'Multiply',
                    code: 'return input[0] * input[1];',
                    language: 'javascript',
                    description: 'Multiplies two numbers',
                    inputs: ['x', 'y'],
                    outputs: ['product'],
                    editable: false
                }
            },
            {
                id: 'output-1',
                type: 'output',
                position: { x: 670, y: 170 },
                data: {
                    label: 'Result',
                    expectedValue: '16'
                }
            }
        ],
        initialEdges: [],
        expectedOutput: '16'
    }
];

export function getPuzzleById(id: string): Puzzle | undefined {
    return puzzles.find(p => p.id === id);
}

export function getPuzzlesByDifficulty(difficulty: Puzzle['difficulty']): Puzzle[] {
    return puzzles.filter(p => p.difficulty === difficulty);
}

export function getPuzzlesByCategory(category: string): Puzzle[] {
    return puzzles.filter(p => p.category === category);
}
