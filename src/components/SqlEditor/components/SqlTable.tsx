import React, { useEffect } from "react";
import { Action } from "../core/constants";
import { useSqlQuiz } from "../core/EditorContext";

interface Props {}

export const SqlTable: React.FunctionComponent<Props> = () => {
	const { dispatch, table } = useSqlQuiz();

	useEffect(() => {
		const columns = [
			{
				id: 1,
				name: "firstName",
			},
			{ id: 2, name: "lastName" },
			{ id: 3, name: "email" },
		];

		const timer = setTimeout(() => {
			dispatch({
				type: Action.SET_TABLE,
				payload: { name: "members", alias: "M", columns },
			});
		}, 500);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="sql-table">
			<div className="sql-table__header">
				<p
					className="asterik"
					onClick={() =>
						dispatch({
							type: Action.ADD_TABLE,
							payload: { value: "*" },
						})
					}
				>
					*
				</p>
				<p
					className="table_name"
					onClick={() => {
						dispatch({
							type: Action.ADD_TABLE,
							payload: {
								value: table.name,
							},
						});
					}}
				>
					{table.name}
				</p>
				<p
					className="alias"
					onClick={() => {
						dispatch({
							type: Action.ADD_TABLE,
							payload: {
								value: table.alias,
							},
						});
					}}
				>
					{table.alias}
				</p>
			</div>
			{table.columns.map((c) => (
				<div
					onClick={() => {
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
