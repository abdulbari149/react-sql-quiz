import React, { createContext, useContext, useReducer } from "react";
import { IAction, IState } from "./interface";
import { sqlReducer } from "./reducer";

const initialState: IState & {
	dispatch: React.Dispatch<IAction> | (() => void);
} = {
	questionIndex: 0,
	answer: [],
	score: 0,
	table: {
		alias: "",
		columns: [],
		name: "",
	},
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
