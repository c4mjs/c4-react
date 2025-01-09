import { useState } from "react";
import { SystemContext } from "./diagrams/SystemContext";

export const diagrams = {
	SystemContext: () => <SystemContext />,
};

export function App() {
	const [selected, setSelected] =
		useState<keyof typeof diagrams>("SystemContext");

	return (
		<div id={"app"}>
			<div id="nav">
				<ul>
					{Object.keys(diagrams).map((key) => (
						<li
							className={selected === key ? "selected" : ""}
							key={key}
							onClick={() => setSelected(key as keyof typeof diagrams)}
							onKeyDown={() => {}}
							onKeyUp={() => {}}
						>
							{key}
						</li>
					))}
				</ul>
			</div>
			<div>{diagrams[selected]()}</div>
		</div>
	);
}
