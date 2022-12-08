import "../sqleditor.css";
import { Button } from "../../shared/Button";
import { SqlTable } from "./SqlTable";
import { useSqlQuiz } from "../core/EditorContext";
import { Action, ErrorCause } from "../core/constants";
import { v4 } from "uuid";
import { useError } from "../../../hooks/useError";

const tags = [
	{ id: v4(), name: "SELECT" },
	{ id: v4(), name: "FROM" },
	{ id: v4(), name: "WHERE" },
	{ id: v4(), name: "GROUP BY" },
	{ id: v4(), name: "HAVING" },
	{ id: v4(), name: "ORDER BY" },
];

export const TablePanel = () => {
	const { dispatch, pauseGame } = useSqlQuiz();

	const { throwError } = useError()

	const handleClick = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		value: string
	) => {
		if (pauseGame) {
			return throwError("Game is Currently Paused", ErrorCause.GameIsPaused);
		}
		dispatch({ type: Action.ADD_CLAUSE, payload: { value } });
	};


	return (
		<div className="table-panel">
			<div className="sql-tags">
				{tags.map((tag) => (
					<Button
						key={tag.id}
						value={tag.name}
						onClick={handleClick}
						size="md"
					/>
				))}
			</div>
			<SqlTable />
		</div>
	);
};
