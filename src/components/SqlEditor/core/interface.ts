import { Action } from "./constants";
export type WithId<T> = { id: number | string } & T;
export type IAnswer = WithId<{
	content: string;
}>;
export type IOperators = WithId<{ symbol: string }>;
export type IColumn = WithId<{ name: string }>;
interface TableType {
	name: string;
	alias: string;
	columns: Array<IColumn>;
}

export interface IState {
	questionIndex: number;
	answer: Array<IAnswer>;
	score: number;
	operators: Array<IOperators>;
	table: TableType;
	result: {
		data: any[];
		count: number;
		columns: string[];
	};
	tabIndex: number;
	open: boolean;
	questionCompleted: boolean
	gameEnded: boolean;
	gameStarted: boolean;
	pauseGame: boolean;
}

export interface IAction {
	payload: any;
	type: Action;
}

export interface AddTagPayload {}

export interface AddFilterPayload {
	newLine: boolean;
	value: string;
}

export interface AddTablePayload {
	value: string;
}

export interface AddColumnPayload {
	value: string;
}

export interface SetTablePayload extends TableType {}

export interface AddOperatorPayload {
	symbol: string;
}

export interface SetResultPayload {
	data: any[];
	columns: string[]
}

export interface ChangeTabIndexPayload {
	index: number;
}
