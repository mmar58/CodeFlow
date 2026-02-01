<script lang="ts">
	import { Handle, Position } from '@xyflow/svelte';
	import type { InputNodeData } from '$lib/types';
	import { CirclePlay } from '@lucide/svelte';
	
	interface Props {
		data: InputNodeData;
		selected?: boolean;
	}
	
	let { data, selected = false }: Props = $props();
</script>

<div class="input-node" class:selected>
	<div class="node-header">
		<CirclePlay size={14} />
		<span class="node-label">{data.label}</span>
	</div>
	<div class="node-content">
		<div class="value-badge" data-type={data.valueType}>
			{data.valueType}
		</div>
		<code class="value-preview">
			{data.value.length > 20 ? data.value.slice(0, 20) + '...' : data.value}
		</code>
	</div>
	<Handle type="source" position={Position.Right} id="output" />
</div>

<style>
	.input-node {
		background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
		border: 2px solid #0f3460;
		border-radius: 12px;
		padding: 12px 16px;
		min-width: 150px;
		color: #e0e0e0;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
		transition: all 0.2s ease;
	}
	
	.input-node:hover {
		border-color: #e94560;
		transform: translateY(-2px);
		box-shadow: 0 6px 25px rgba(233, 69, 96, 0.2);
	}
	
	.input-node.selected {
		border-color: #e94560;
		box-shadow: 0 0 0 3px rgba(233, 69, 96, 0.3);
	}
	
	.node-header {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 8px;
		color: #4ecca3;
	}
	
	.node-label {
		font-weight: 600;
		font-size: 13px;
	}
	
	.node-content {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	
	.value-badge {
		font-size: 10px;
		padding: 2px 8px;
		border-radius: 10px;
		background: rgba(78, 204, 163, 0.2);
		color: #4ecca3;
		text-transform: uppercase;
		width: fit-content;
	}
	
	.value-badge[data-type="number"] {
		background: rgba(52, 152, 219, 0.2);
		color: #3498db;
	}
	
	.value-badge[data-type="array"] {
		background: rgba(155, 89, 182, 0.2);
		color: #9b59b6;
	}
	
	.value-badge[data-type="object"] {
		background: rgba(230, 126, 34, 0.2);
		color: #e67e22;
	}
	
	.value-preview {
		font-family: 'JetBrains Mono', 'Fira Code', monospace;
		font-size: 12px;
		background: rgba(0, 0, 0, 0.3);
		padding: 6px 10px;
		border-radius: 6px;
		color: #fff;
	}
</style>
