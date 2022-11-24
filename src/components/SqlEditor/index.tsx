import { useState } from "react";
import { Score } from "./components/Score";
import { Timer } from "./components/Timer";
import "./sqleditor.css";
import { QueryOptions } from "./components/QueryOptions";
import { Actions } from "./components/Actions";
import { SqlQuizProvider } from "./core/EditorContext";
import { SqlBox } from "./components/SqlBox";

const SqlEditor = () => {
	return (
		<SqlQuizProvider>
			<Timer onComplete={() => console.log("Timemout")} />
			<Score />

			<div className="editor_main">
				<SqlBox />
				<Actions />
				<QueryOptions />
			</div>
		</SqlQuizProvider>
	);
};

export default SqlEditor;
