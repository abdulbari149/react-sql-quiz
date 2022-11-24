import React from "react";
import { Action } from "./actions";
import { IAction, IAnswer, IState } from "./interface";

export const sqlReducer: React.Reducer<IState, IAction> = (state, action) => {
	switch (action.type) {
		case Action.ADD_CLAUSE:
			const answer = [
				...state.answer,
				{ id: state.answer.length + 1, content: action.payload },
			];
			return {
				...state,
				answer,
			};
		case Action.DELETE_CLAUSE:
			const answers = [...state.answer];
			return {
				...state,
				answer: answers.slice(0, state.answer.length - 1),
			};
		case Action.CLEAR_SQL:
			return {
				...state,
				answer: [],
			};
		default:
			return state;
	}
};
