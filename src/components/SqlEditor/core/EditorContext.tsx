import React, { createContext, useContext, useReducer } from "react";
import { IAction, IState } from "./interface";
import { sqlReducer } from "./reducer";

const initialState: IState & {
	dispatch: React.Dispatch<IAction> | (() => void);
} = {
	questionIndex: 0,
	answer: [
		{ id: 1, content: "SELECT" },
		{ id: 2, content: "FROM users" },
		{ id: 3, content: "WHERE id=3;" },
	],
	score: 0,
	dispatch: () => {},
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
