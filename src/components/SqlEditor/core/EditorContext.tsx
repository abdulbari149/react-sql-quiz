import React, { createContext, useContext, useReducer } from "react";
import { IAction, IState } from "./interface";
import { sqlReducer } from "./reducer";
import { v4 } from "uuid";

const initialState: IState & {
	dispatch: React.Dispatch<IAction> | (() => void);
} = {
	tabIndex: 0,
	gameStarted: false,
	questionIndex: 0,
	answer: [],
	score: 0,
	table: {
		alias: "",
		columns: [],
		name: "",
	},
	operators: [
		{ id: v4(), symbol: "=" },
		{ id: v4(), symbol: "<>" },
		{ id: v4(), symbol: "!=" },
		{ id: v4(), symbol: "<" },
		{ id: v4(), symbol: ">" },
		{ id: v4(), symbol: "BETWEEN" },
		{ id: v4(), symbol: "AND" },
		{ id: v4(), symbol: "NOT" },
		{ id: v4(), symbol: "OR" },
		{ id: v4(), symbol: "IN" },
		{ id: v4(), symbol: "(" },
		{ id: v4(), symbol: ")" },
	],
	dispatch: () => {},
	result: {
		data: [],
		columns: [],
		count: 0,
	},
	open: false,
	questionCompleted: false,
	gameEnded: false,
	pauseGame: false,
};

const SqlQuizContext = createContext(initialState);

export const SqlQuizProvider: React.FunctionComponent<
	React.PropsWithChildren
> = ({ children }) => {
	const [state, dispatch] = useReducer(sqlReducer, initialState);
	return (
		<SqlQuizContext.Provider
			value={{
				...state,
				dispatch,
			}}
		>
			{children}
		</SqlQuizContext.Provider>
	);
};

export const useSqlQuiz = () => useContext(SqlQuizContext);
