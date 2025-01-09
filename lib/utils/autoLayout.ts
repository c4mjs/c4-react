import { layout } from "@dagrejs/dagre";
import { Graph } from "@dagrejs/graphlib";
import type { Edge, Node, NodePositionChange } from "@xyflow/react";

export const autoLayout = (nodes: Node[], edges: Edge[]) => {
	const graph = new Graph({ directed: true });

	graph.setGraph({ rankdir: "TB", marginx: 20, marginy: 20 });
	graph.setDefaultEdgeLabel(() => ({}));

	for (const node of nodes) {
		graph.setNode(node.id, {
			label: node.data.label,
			width: 400,
			height: 300,
		});
	}

	for (const edge of edges) {
		graph.setEdge(edge.source, edge.target);
	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	layout(graph, { nodesep: 100, ranksep: 100 });

	const nodeChanges: NodePositionChange[] = [];

	for (const node of graph.nodes()) {
		const position = graph.node(node);
		nodeChanges.push({
			type: "position",
			id: node,
			position: { x: position.x, y: position.y },
		});
	}

	return nodeChanges;
};
