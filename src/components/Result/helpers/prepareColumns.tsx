import { Column } from "react-table";

export const prepareColumns = (columns: string[]): ReadonlyArray<Column> => {
	return columns.map((value) => {
		const column: Column = {
			Header: value,
			id: value.toLowerCase(),
			Cell: (props, index) => <div className="cell">{}</div>,
		};
		return column;
	});
};
