import type { Edge, EdgeTypes, Node, NodeTypes } from "@xyflow/react";
import { SimpleFloatingEdgeType } from "./SimpleFloatingEdge";
import { SystemNodeType } from "./SystemNodeType";

export enum C4NodeType {
	System = "system",
}

export enum C4EdgeType {
	SimpleFloating = "simple-floating",
}

export type C4Node<T extends C4NodeType = C4NodeType> = { id: string; type: T };

export interface C4System extends C4Node<C4NodeType.System> {
	type: C4NodeType.System;
	name: string;
	description?: string;
	external?: boolean;
}

export type RelationshipOptions = {
	sourceHandle?: HandlePosition;
	targetHandle?: HandlePosition;
};

export type Relationship = [
	C4Node,
	string,
	C4Node,
	string | undefined,
	RelationshipOptions | undefined,
];
export enum HandlePosition {
	TopLeft = "TopLeft",
	TopCenter = "TopCenter",
	TopRight = "TopRight",
	RightTop = "RightTop",
	RightCenter = "RightCenter",
	RightBottom = "RightBottom",
	BottomRight = "BottomRight",
	BottomCenter = "BottomCenter",
	BottomLeft = "BottomLeft",
	LeftBottom = "LeftBottom",
	LeftCenter = "LeftCenter",
	LeftTop = "LeftTop",
}

export type RelationshipData = {
	description: string;
	technology?: string;
	sourceHandle?: HandlePosition;
	targetHandle?: HandlePosition;
};

export type RelationshipEdge = Edge<RelationshipData>;

export const RFEdgeTypes: EdgeTypes = {
	[C4EdgeType.SimpleFloating]: SimpleFloatingEdgeType,
};

export type SystemData = {
	name: string;
	description?: string;
	external?: boolean;
};

export type SystemNode = Node<SystemData>;

export const RFNodeTypes: NodeTypes = {
	[C4NodeType.System]: SystemNodeType,
};
