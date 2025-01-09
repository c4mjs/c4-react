import {
	BaseEdge,
	EdgeLabelRenderer,
	type EdgeProps,
	type Handle,
	type InternalNode,
	Position,
	type XYPosition,
	getBezierPath,
	useInternalNode,
} from "@xyflow/react";
import type { FC, ReactNode } from "react";
import type { HandlePosition, RelationshipEdge } from "./declerations";

function calculateDistance(
	x1: number,
	y1: number,
	x2: number,
	y2: number,
): number {
	return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function getHandleAbsolutePosition(
	node: InternalNode,
	handle: Handle,
): { x: number; y: number } {
	let handleX = node.internals.positionAbsolute.x + handle.x;
	let handleY = node.internals.positionAbsolute.y + handle.y;

	switch (handle.position) {
		case Position.Left:
			handleX += 0; // No offset for Left
			handleY += handle.height / 2; // Center vertically
			break;
		case Position.Right:
			handleX += handle.width; // Offset for Right alignment
			handleY += handle.height / 2; // Center vertically
			break;
		case Position.Top:
			handleX += handle.width / 2; // Center horizontally
			handleY += 0; // No offset for Top
			break;
		case Position.Bottom:
			handleX += handle.width / 2; // Center horizontally
			handleY += handle.height; // Offset for Bottom alignment
			break;
		default:
			// Custom or non-standard positions, center the handle
			handleX += handle.width / 2;
			handleY += handle.height / 2;
			break;
	}

	return { x: handleX, y: handleY };
}

function getAllHandles(node: InternalNode) {
	return [
		...(node.internals.handleBounds?.source || []),
		...(node.internals.handleBounds?.target || []),
	];
}

function findNearestHandle(node: InternalNode, target: XYPosition): Handle {
	const sortedHandles = getAllHandles(node)
		.map((handle) => {
			const { x: handleX, y: handleY } = getHandleAbsolutePosition(
				node,
				handle,
			);
			const distance = calculateDistance(target.x, target.y, handleX, handleY);
			return { x: handleX, y: handleY, handle, distance };
		})
		.sort((a, b) => a.distance - b.distance);

	return sortedHandles[0].handle;
}

function getNodeCenter(node: InternalNode) {
	return {
		x: node.internals.positionAbsolute.x + (node.measured.width || 0) / 2,
		y: node.internals.positionAbsolute.y + (node.measured.height || 0) / 2,
	};
}

export function getEdgeParams(
	source: InternalNode,
	target: InternalNode,
	sourceHandlePosition?: HandlePosition,
	targetHandlePosition?: HandlePosition,
): {
	sourceX: number;
	sourceY: number;
	targetX: number;
	targetY: number;
	sourcePosition: Position;
	targetPosition: Position;
} {
	const sourceHandle =
		(sourceHandlePosition &&
			getAllHandles(source).find((it) => it.id === sourceHandlePosition)) ||
		findNearestHandle(source, getNodeCenter(target));

	const targetHandle =
		(targetHandlePosition &&
			getAllHandles(target).find((it) => it.id === targetHandlePosition)) ||
		findNearestHandle(target, getNodeCenter(source));

	const { x: sourceX, y: sourceY } = getHandleAbsolutePosition(
		source,
		sourceHandle,
	);

	const { x: targetX, y: targetY } = getHandleAbsolutePosition(
		target,
		targetHandle,
	);

	return {
		sourceX,
		sourceY,
		targetX,
		targetY,
		sourcePosition: sourceHandle.position,
		targetPosition: targetHandle.position,
	};
}

/**
 * Get the position of the edge relative to the node based on the intersection point
 * This is used to provide free floating edges that are not attached to a specific handle
 * @see https://reactflow.dev/examples/edges/floating-edges
 */
// function getEdgePosition(node: InternalNode, intersectionPoint: XYPosition) {
//   const n = { ...node.internals.positionAbsolute, ...node };
//   const nx = Math.round(n.x);
//   const ny = Math.round(n.y);
//   const px = Math.round(intersectionPoint.x);
//   const py = Math.round(intersectionPoint.y);

//   if (px <= nx + 1) {
//     return Position.Left;
//   }
//   if (px >= nx + (n.measured.width || 0) - 1) {
//     return Position.Right;
//   }
//   if (py <= ny + 1) {
//     return Position.Top;
//   }
//   if (py >= n.y + (n.measured.height || 0) - 1) {
//     return Position.Bottom;
//   }
//   return Position.Top;
// }

export const SimpleFloatingEdgeType: FC<EdgeProps<RelationshipEdge>> = ({
	source,
	target,
	markerEnd,
	style,
	data,
}): ReactNode => {
	const sourceNode = useInternalNode(source);
	const targetNode = useInternalNode(target);

	if (!sourceNode || !targetNode) {
		return <></>;
	}

	const [edgePath, labelX, labelY] = getBezierPath(
		getEdgeParams(
			sourceNode,
			targetNode,
			data?.sourceHandle,
			data?.targetHandle,
		),
	);

	return (
		<>
			<BaseEdge
				path={edgePath}
				markerEnd={markerEnd}
				style={style}
				interactionWidth={20}
			/>
			<EdgeLabelRenderer>
				<div
					style={{
						position: "absolute",
						transform: "translate(-50%, -50%)",
						left: labelX,
						top: labelY,
						padding: "4px",
						fontSize: "12px",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						borderRadius: "4px",
						boxShadow: "0 2px 20px rgba(0, 0, 0, 0.1)",
						backdropFilter: "blur(10px)",
					}}
				>
					<span style={{ width: 100, textAlign: "center" }}>
						{data?.description}
					</span>
					{data?.technology && <span>[{data.technology}]</span>}
				</div>
			</EdgeLabelRenderer>
		</>
	);
};
