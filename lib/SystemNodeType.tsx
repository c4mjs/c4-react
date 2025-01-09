import { Handle, type NodeProps, Position } from "@xyflow/react";
import type { FC } from "react";
import { HandlePosition, type SystemNode } from "./declerations";

const handleStyle = {
	border: "none",
	backgroundColor: "transparent",
};

export const SystemNodeType: FC<NodeProps<SystemNode>> = ({ data }) => {
	return (
		<div
			style={{
				width: 250,
				height: 150,
				borderWidth: 2,
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: data.external ? "#8B8496" : "#1061B0",
				borderRadius: 10,
				padding: 10,
				color: "white",
				boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
			}}
		>
			<Handle
				id={"top-c"}
				type="source"
				position={Position.Top}
				style={handleStyle}
			/>
			<Handle
				id={HandlePosition.TopLeft}
				type="source"
				position={Position.Top}
				style={{ left: "20%", ...handleStyle }}
			/>
			<Handle
				id={HandlePosition.TopRight}
				type="source"
				position={Position.Top}
				style={{ left: "80%", ...handleStyle }}
			/>

			<Handle
				id={HandlePosition.RightCenter}
				type="source"
				position={Position.Right}
				style={handleStyle}
			/>
			<Handle
				id={HandlePosition.RightTop}
				type="source"
				position={Position.Right}
				style={{ top: "20%", ...handleStyle }}
			/>
			<Handle
				id={HandlePosition.RightBottom}
				type="source"
				position={Position.Right}
				style={{ top: "80%", ...handleStyle }}
			/>
			<Handle
				id={HandlePosition.BottomCenter}
				type="source"
				position={Position.Bottom}
				style={handleStyle}
			/>
			<Handle
				id={HandlePosition.BottomLeft}
				type="source"
				position={Position.Bottom}
				style={{ left: "20%", ...handleStyle }}
			/>
			<Handle
				id={HandlePosition.BottomRight}
				type="source"
				position={Position.Bottom}
				style={{ left: "80%", ...handleStyle }}
			/>
			<Handle
				id={HandlePosition.LeftCenter}
				type="source"
				position={Position.Left}
				style={handleStyle}
			/>
			<Handle
				id={HandlePosition.LeftTop}
				type="source"
				position={Position.Left}
				style={{ top: "20%", ...handleStyle }}
			/>
			<Handle
				id={HandlePosition.LeftBottom}
				type="source"
				position={Position.Left}
				style={{ top: "80%", ...handleStyle }}
			/>
			<text style={{ textAlign: "center" }}>
				<strong>{data.name}</strong>
			</text>
			<text style={{ fontSize: "small" }}>[Software System]</text>
			<text
				style={{
					fontSize: "smaller",
					color: "rgb(204, 204, 204)",
					textAlign: "center",
				}}
			>
				{data.description}
			</text>
		</div>
	);
};
