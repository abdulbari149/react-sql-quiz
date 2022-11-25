import React from "react";
import { Action } from "./actions";
import { IAction, IAnswer, IState } from "./interface";

const addToAnswer = (answer: IAnswer[], value: string) => {
	const updatedAnswer = [
		...answer,
		{
			id: answer.length + 1,
			content: value,
		},
	];
	return updatedAnswer;
};

export const sqlReducer: React.Reducer<IState, IAction> = (state, action) => {
	switch (action.type) {
		case Action.ADD_CLAUSE:
			const answer = addToAnswer(state.answer, action.payload.value);
			return { ...state, answer };
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
		case Action.ADD_FILTER:
			if (action.payload.newLine) {
				const answer = addToAnswer(state.answer, action.payload.value);
				return { ...state, answer };
			}
			const lastAnswer = { ...state.answer[state.answer.length - 1] };
			lastAnswer.content += " " + action.payload.value;
			const updatedAnswer = [
				...state.answer.slice(0, state.answer.length - 1),
				lastAnswer,
			];
			return {
				...state,
				answer: updatedAnswer,
			};
		default:
			return state;
	}
};
