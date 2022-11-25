import "../sqleditor.css";
import { MdDelete } from "react-icons/md";
import { FiDelete } from "react-icons/fi";
import { IoMdPlay } from "react-icons/io";
import React from "react";
import { useSqlQuiz } from "../core/EditorContext";
import { Action } from "../core/constants";

export const Actions = () => {
	const { dispatch } = useSqlQuiz();

	const handleDelete = (e: React.MouseEvent<HTMLDivElement>) => {
		dispatch({ type: Action.DELETE_CLAUSE, payload: null });
	};

	const handleClear = (e: React.MouseEvent<HTMLDivElement>) => {
		dispatch({ type: Action.CLEAR_SQL, payload: null });
	};

	return (
		<div className="actions">
			<div className="semi-colon">;</div>
			<div className="execute">
				<IoMdPlay
					style={{ paddingRight: 8, top: 3, position: "relative" }}
					fontSize={20}
					color="white"
				/>
				Execute
			</div>
			<div className="clear" onClick={handleClear}>
				<MdDelete fontSize={25} color={"white"} />
			</div>
			<div className="delete" onClick={handleDelete}>
				<FiDelete fontSize={25} color="white" />
			</div>
		</div>
	);
};
