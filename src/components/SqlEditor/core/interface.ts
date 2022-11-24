import { Action } from "./actions";

export interface IAnswer {
	id: number | string;
	content: string;
}

export interface IState {
	questionIndex: number;
	answer: Array<IAnswer>;
	score: number;
}

export interface IAction {
	payload: any;
	type: Action;
}
