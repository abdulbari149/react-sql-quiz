import React from "react";
import { Action } from "../core/constants";
import { IAction } from "../core/interface";

const NextQuestionBtn: React.FunctionComponent<{
	dispatch: React.Dispatch<IAction> | (() => void);
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ dispatch, onClick = (e) => {} }) => {
	return (
		<button
			className="btn btn-primary"
			style={{ display: "grid", margin: "0 auto", cursor: "pointer" }}
			onClick={(e) => {
				dispatch({ type: Action.CHANGE_QUESTION, payload: {} });
				onClick(e);
			}}
		>
			Next Question
		</button>
	);
};

export default NextQuestionBtn;
