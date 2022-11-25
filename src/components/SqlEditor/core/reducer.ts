import React from "react";
import { ActionController } from "./actions";
import { Action } from "./constants";
import { IAction, IState } from "./interface";

// ADD Statement
// DELETE STATEMENT
// CLEAR

const actionsController = new ActionController();

export const sqlReducer: React.Reducer<IState, IAction> = (state, action) => {
	switch (action.type) {
		case Action.ADD_CLAUSE:
			return actionsController.addClause(state, action.payload);
		case Action.DELETE_CLAUSE:
			return actionsController.deleteClause(state);
		case Action.CLEAR_SQL:
			return actionsController.clearClause(state);
		case Action.ADD_FILTER:
			return actionsController.addFilter(state, action.payload);
		case Action.ADD_TABLE:
			return actionsController.addTable(state, action.payload);
		case Action.SET_TABLE:
			return actionsController.setTable(state, action.payload);
		case Action.ADD_COLUMN:
			console.log(action.payload);
			return actionsController.addColumn(state, action.payload);
		default:
			return state;
	}
};
