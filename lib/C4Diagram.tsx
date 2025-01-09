import {
	ConnectionMode,
	Controls,
	type Edge,
	type Node,
	type NodeChange,
	type NodePositionChange,
	type OnInit,
	ReactFlow,
	applyNodeChanges,
} from "@xyflow/react";
import {
	type CSSProperties,
	type FC,
	useCallback,
	useEffect,
	useState,
} from "react";
import {
	type C4Node,
	RFEdgeTypes,
	RFNodeTypes,
	type Relationship,
	type RelationshipEdge,
} from "./declerations.ts";
import { autoLayout } from "./utils/autoLayout.ts";
import { edgeFromRelation } from "./utils/edgeFromRelation.ts";
import { nodeFromC4Node } from "./utils/nodeFromSystem.ts";

export type Row = number;
export type Col = number;

export type C4DiagramProps = {
	model: Relationship[];
	styles?: { root?: CSSProperties };
	positions?: [C4Node, Row, Col][];
	withoutControls?: boolean;
	onInit?: OnInit<Node, Edge>;
};

export const C4Diagram: FC<C4DiagramProps> = ({
	model,
	styles,
	positions,
	withoutControls,
	onInit,
}) => {
	const initialNodes: Node[] = model
		.flatMap((relationship) => [relationship[0], relationship[2]])
		.map((it) => nodeFromC4Node(it));

	const initialEdges: RelationshipEdge[] = model.map(edgeFromRelation);

	const [nodes, setNodes] = useState<Node[]>(
		applyNodeChanges(
			[
				...autoLayout(initialNodes as Node[], initialEdges as Edge[]),
				...(positions || []).map(
					([{ id }, row, col]): NodePositionChange => ({
						id,
						type: "position",
						position: { x: col * 600, y: row * 350 },
					}),
				),
			],
			initialNodes as Node[],
		),
	);
	const [edges] = useState<RelationshipEdge[]>(initialEdges);

	const onNodesChange = useCallback(
		(changes: NodeChange[]) =>
			setNodes((_nodes) => applyNodeChanges(changes, _nodes)),
		[],
	);

	useEffect(() => {
		(
			document
				.getElementsByClassName("react-flow__controls-interactive")
				.item(0) as HTMLButtonElement
		)?.click();
	}, []);

	return (
		<ReactFlow
			onInit={onInit}
			style={styles?.root}
			edges={edges as Edge[]}
			nodes={nodes}
			nodeTypes={RFNodeTypes}
			edgeTypes={RFEdgeTypes}
			connectionMode={ConnectionMode.Loose}
			onNodesChange={onNodesChange}
			edgesReconnectable={false}
			fitView
		>
			{!withoutControls && <Controls orientation={"horizontal"} />}
		</ReactFlow>
	);
};
