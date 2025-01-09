import type { Node } from "@xyflow/react";
import {
	type C4Node,
	C4NodeType,
	type C4System,
	type SystemNode,
} from "../declerations";

export const nodeFromSystem = (system: C4System): SystemNode => {
	return {
		id: system.id,
		type: "system",
		position: { x: 0, y: 0 },
		data: {
			name: system.name,
			description: system.description,
			external: system.external,
		},
	};
};

export const nodeFromC4Node = (node: C4Node): Node => {
	switch (node.type) {
		case C4NodeType.System:
			return nodeFromSystem(node as C4System);
		default:
			throw new Error(`Unknown node type: ${node.type}`);
	}
};
