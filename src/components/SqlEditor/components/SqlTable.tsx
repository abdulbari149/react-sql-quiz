import React, { useEffect } from "react";
import { useDatabase } from "../../../SQLDatabase";
import { Action, ErrorCause, ErrorMessages } from "../core/constants";
import { useSqlQuiz } from "../core/EditorContext";
import { IColumn, SetTablePayload } from "../core/interface";
import data from "../../../data/quiz.json";
import { useError } from "../../../hooks/useError";
interface Props {}

const { GAME_IS_PAUSED } = ErrorMessages;

export const SqlTable: React.FunctionComponent<Props> = () => {
	const { questionIndex, pauseGame, dispatch, table } = useSqlQuiz();
	const db = useDatabase();

	const { throwError } = useError();

	useEffect(() => {
		const { tableName } = data[questionIndex];
		const result = db.exec(
			`SELECT name FROM PRAGMA_TABLE_INFO('${tableName}');`
		);
		const values = result.map((value) => value.values);
		const columns: IColumn[] = values[0]
			.flatMap((e) => e)
			.map((e, idx) => ({ id: idx + 1, name: `${e}` }));
		const payload: SetTablePayload = {
			name: tableName,
			alias: tableName.charAt(0).toUpperCase(),
			columns,
		};
		dispatch({ type: Action.SET_TABLE, payload });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [questionIndex]);

	const handleAddTable: React.MouseEventHandler<HTMLParagraphElement> = (e) => {
		if (pauseGame) {
			return throwError(GAME_IS_PAUSED, ErrorCause.GameIsPaused);
		}
		dispatch({
			type: Action.ADD_TABLE,
			payload: { value: e.currentTarget.innerText },
		});
	};

	return (
		<div className="sql-table">
			<div className="sql-table__header">
				<p className="asterik" onClick={handleAddTable}>
					*
				</p>
				<p className="table_name" onClick={handleAddTable}>
					{table.name}
				</p>
				<p className="alias" onClick={handleAddTable}>
					{table.alias}
				</p>
			</div>
			{table.columns.map((c) => (
				<div
					onClick={() => {
						if (pauseGame) {
							return throwError(GAME_IS_PAUSED, ErrorCause.GameIsPaused);
						}
						dispatch({ type: Action.ADD_COLUMN, payload: { value: c.name } });
					}}
					key={c.id}
					className="sql-table__column"
				>
					{c.name}
				</div>
			))}
			<div></div>
		</div>
	);
};
