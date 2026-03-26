import { json } from '@sveltejs/kit';
import db from '$lib/server/db';
import type { RequestEvent } from './$types';

export async function GET({ params }: RequestEvent) {
    try {
        const { id } = params;
        const puzzle = await db('puzzles').where('id', id).first();
        
        if (!puzzle) {
            return json({ error: 'Puzzle not found' }, { status: 404 });
        }
        
        return json(puzzle);
    } catch (error) {
        console.error(`Failed to fetch puzzle ${params.id}:`, error);
        return json({ error: 'Failed to fetch puzzle' }, { status: 500 });
    }
}

export async function PUT({ params, request }: RequestEvent) {
    try {
        const { id } = params;
        const data = await request.json();
        
        const updateData = {
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
            validation_fn: data.validationFn
        };

        await db('puzzles').where('id', id).update(updateData);
        
        const updatedPuzzle = await db('puzzles').where('id', id).first();
        return json(updatedPuzzle);
    } catch (error) {
        console.error(`Failed to update puzzle ${params.id}:`, error);
        return json({ error: 'Failed to update puzzle' }, { status: 500 });
    }
}

export async function DELETE({ params }: RequestEvent) {
    try {
        const { id } = params;
        const deletedRows = await db('puzzles').where('id', id).del();
        
        if (deletedRows === 0) {
            return json({ error: 'Puzzle not found or already deleted' }, { status: 404 });
        }
        
        return json({ success: true });
    } catch (error) {
        console.error(`Failed to delete puzzle ${params.id}:`, error);
        return json({ error: 'Failed to delete puzzle' }, { status: 500 });
    }
}
