import { ConnectionLineType, MarkerType } from "@xyflow/react";
import {
	C4EdgeType,
	type Relationship,
	type RelationshipEdge,
} from "../declerations";

export const edgeFromRelation = ([
	source,
	description,
	target,
	technology,
	options,
]: Relationship): RelationshipEdge => {
	return {
		id: `${source.id}-${target.id}`,
		source: source.id,
		target: target.id,
		label: description,
		data: {
			description,
			technology,
			sourceHandle: options?.sourceHandle,
			targetHandle: options?.targetHandle,
		},
		animated: true,
		type: C4EdgeType.SimpleFloating || ConnectionLineType.SmoothStep,
		markerEnd: {
			type: MarkerType.ArrowClosed,
		},
		style: {
			strokeWidth: 4,
		},
	};
};
