import "../sqleditor.css";
import { Button } from "../../shared/Button";
import { SqlTable } from "./SqlTable";
import { useSqlQuiz } from "../core/EditorContext";
import { Action } from "../core/actions";

const tags = [
	{ id: 1, name: "SELECT" },
	{ id: 2, name: "FROM" },
	{ id: 3, name: "WHERE" },
	{ id: 4, name: "GROUP BY" },
	{ id: 5, name: "HAVING" },
	{ id: 6, name: "ORDER BY" },
];

export const TablePanel = () => {
	const { dispatch } = useSqlQuiz();

	return (
		<div className="table-panel">
			<div className="sql-tags">
				{tags.map((tag) => (
					<Button
						key={tag.id}
						value={tag.name}
						onClick={(e, value) =>
							dispatch({ type: Action.ADD_CLAUSE, payload: value })
						}
						size="md"
					/>
				))}
			</div>
			<SqlTable />
		</div>
	);
};
