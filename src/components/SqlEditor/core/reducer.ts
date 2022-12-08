import React from "react";
import { ActionController } from "./actions";
import { Action } from "./constants";
import { IAction, IState } from "./interface";

const actionsController = new ActionController();

export const sqlReducer: React.Reducer<IState, IAction> = (state, action) => {
	switch (action.type) {
		case Action.START_GAME:
			return actionsController.startGame(state);
		case Action.ADD_CLAUSE:
			return actionsController.addClause(state, action.payload);
		case Action.DELETE_CLAUSE:
			return actionsController.deleteClause(state);
		case Action.ADD_CHARACTER:
			return actionsController.addCharacter(state, action.payload);
		case Action.DELETE_CHARACTER:
			return actionsController.deleteCharacter(state)
		case Action.SET_ANSWER:
			return actionsController.setAnswer(state, action.payload);
		case Action.CLEAR_SQL:
			return actionsController.clearClause(state);
		case Action.ADD_FILTER:
			return actionsController.addFilter(state, action.payload);
		case Action.ADD_TABLE:
			return actionsController.addTable(state, action.payload);
		case Action.SET_TABLE:
			return actionsController.setTable(state, action.payload);
		case Action.ADD_COLUMN:
			return actionsController.addColumn(state, action.payload);
		case Action.ADD_OPERATOR:
			return actionsController.addOperator(state, action.payload);
		case Action.SET_RESULT:
			return actionsController.setResult(state, action.payload);
		case Action.CHANGE_TAB_INDEX:
			return actionsController.changeTabIndex(state, action.payload);
		case Action.UPDATE_SCORE:
			return actionsController.updateScore(state);
		case Action.HANDLE_SUCCESS_MODAL:
			return actionsController.handleSuccessModal(state, action.payload);
		case Action.CHANGE_QUESTION:
			return actionsController.nextQuestion(state);
		case Action.GAME_ENDED:
			return actionsController.gameEnded(state);
		case Action.PLAY_AGAIN:
			return actionsController.playAgain(state);
		case Action.PAUSE_GAME:
			return actionsController.pausePlay(state);
		case Action.RESUME_GAME:
			return actionsController.resumeGame(state);
		default:
			return state;
	}
};
