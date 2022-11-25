import React from "react";

interface Props {}
export const SqlTable: React.FunctionComponent<Props> = () => {
	const columns = [
		{
			id: 1,
			name: "firstName",
		},
		{ id: 2, name: "lastName" },
		{ id: 3, name: "email" },
	];
	return (
		<div className="sql-table">
			<div className="sql-table__header">
				<p className="asterik">*</p>
				<p className="table_name">members</p>
				<p className="alias">M</p>
			</div>
			{columns.map(c => <div key={c.id} className="sql-table__column">{c.name}</div>)}
			<div></div>
		</div>
	);
};
