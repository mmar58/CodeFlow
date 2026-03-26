import { json } from '@sveltejs/kit';
import db from '$lib/server/db';
import type { RequestEvent } from './$types';

export async function GET() {
    try {
        const puzzles = await db('puzzles').orderBy('created_at', 'desc');
        return json(puzzles);
    } catch (error) {
        console.error('Failed to fetch puzzles:', error);
        return json({ error: 'Failed to fetch puzzles' }, { status: 500 });
    }
}

export async function POST({ request }: RequestEvent) {
    try {
        const data = await request.json();
        
        // Prepare the insert data making sure arrays/objects are stringified for DB
        const insertData = {
            id: data.id,
            title: data.title,
            description: data.description,
            difficulty: data.difficulty || 'beginner',
            category: data.category,
            instructions: JSON.stringify(data.instructions || []),
            hints: JSON.stringify(data.hints || []),
            initial_nodes: JSON.stringify(data.initialNodes || []),
            initial_edges: JSON.stringify(data.initialEdges || []),
            locked_nodes: JSON.stringify(data.lockedNodes || []),
            expected_output: data.expectedOutput,
            validation_fn: data.validationFn,
            is_custom: true
        };

        await db('puzzles').insert(insertData);
        
        const [newPuzzle] = await db('puzzles').where('id', data.id);
        return json(newPuzzle, { status: 201 });
    } catch (error) {
        console.error('Failed to create puzzle:', error);
        return json({ error: 'Failed to create puzzle' }, { status: 500 });
    }
}
