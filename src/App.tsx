import reactLogo from "./assets/react.svg";
import "./App.css";
import { useState } from "react";

interface ClickedProps {
	clientX: number;
	clientY: number;
}

function App() {
	const [clickedPoints, setClickedPoints] = useState<ClickedProps[]>([]);
	const [undoPoints, setUndoPoints] = useState<ClickedProps[]>([]);

	const getCoordinates = (e: React.MouseEvent<HTMLElement>) => {
		const { clientX, clientY } = e;

		setClickedPoints([...clickedPoints, { clientX, clientY }]);
	};

	const handleUndo = () => {
		const newClickedPoint = [...clickedPoints];
		const undoPoint = newClickedPoint.pop();
		setClickedPoints(newClickedPoint);
		if (!undoPoint) return;
		setUndoPoints([...undoPoints, undoPoint]);
	};

	const handleRedo = () => {
		const newUndoPoints = [...undoPoints];
		const redoPoint = newUndoPoints.pop();
		setUndoPoints(newUndoPoints);
		if (!redoPoint) return;
		setClickedPoints([...clickedPoints, redoPoint]);
	};

	return (
		<>
			<button
				disabled={clickedPoints.length === 0}
				onClick={handleUndo}
			>
				Undo
			</button>
			<button disabled={undoPoints.length === 0} onClick={handleRedo}>
				Redo
			</button>
			<div className="App" onClick={getCoordinates}>
				{clickedPoints.map((clickedPoint, i) => {
					return (
						<div
							key={i}
							className="circlePoint"
							style={{
								position: "absolute",
								left: clickedPoint.clientX,
								top: clickedPoint.clientY,
							}}
						/>
					);
				})}
			</div>
		</>
	);
}

export default App;
