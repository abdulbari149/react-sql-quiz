import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { SqlQuizProvider } from "./components/SqlEditor/core/EditorContext";
import { SQLDatabaseProvider } from "./SQLDatabase";

const rootElement = document.getElementById("root");
ReactDOM.render(
	<React.StrictMode>
		<SQLDatabaseProvider>
			<SqlQuizProvider>
				<App />
			</SqlQuizProvider>
		</SQLDatabaseProvider>
	</React.StrictMode>,
	rootElement
);
