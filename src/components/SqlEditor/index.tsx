import "./sqleditor.css";
import { QueryOptions } from "./components/QueryOptions";
import { Actions } from "./components/Actions";
import { SqlBox } from "./components/SqlBox";
import { ErrorBoundary } from "./components/ErrorBoundray";
import { useSqlQuiz } from "./core/EditorContext";
import { Action } from "./core/constants";
const SqlEditor = () => {
	const { gameStarted, dispatch } = useSqlQuiz();

	if (!gameStarted)
		return (
			<div
				style={{
					width: "100%",
					height: "80vh",
					display: "grid",
					placeContent: "center",
					gridGap: '2em',
				}}
			>
				<h2 style={{ color: "white", textAlign: "center" }}>
					The Game hasn't yet Started.
					<br /> Let's Begin
				</h2>
				<button
					className="btn btn-outline-dark w-50 m-auto"
					onClick={() => dispatch({ type: Action.START_GAME, payload: {} })}
				>
					Start Game
				</button>
			</div>
		);

	return (
		<ErrorBoundary>
			<div className="editor_main">
				<SqlBox />
				<Actions />
				<QueryOptions />
			</div>
		</ErrorBoundary>
	);
};

export default SqlEditor;
