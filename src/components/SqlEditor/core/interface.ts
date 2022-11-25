import { Action } from "./constants";
export type WithId<T> = { id: number | string } & T;
export type IAnswer = WithId<{
	content: string;
}>;

interface TableType {
	name: string;
	alias: string;
	columns: Array<WithId<{ name: string }>>;
}

export interface IState {
	questionIndex: number;
	answer: Array<IAnswer>;
	score: number;
	table: TableType;
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
