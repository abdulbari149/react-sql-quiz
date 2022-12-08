export enum Action {
	START_GAME = "START_GAME",
	ADD_NEW_OPTION = "ADD_NEW_OPTION",
	ADD_CLAUSE = "ADD_CLAUSE",
	DELETE_CLAUSE = "DELETE_CLAUSE",
	ADD_CHARACTER = "ADD_CHARACTER",
	DELETE_CHARACTER = "DELETE_CHARACTER",
	CLEAR_SQL = "CLEAR_SQL",
	ADD_FILTER = "ADD_FILTER",
	ADD_TABLE = "ADD_TABLE",
	ADD_TAG = "ADD_TAG",
	DELETE_TAG = "DELETE_TAG",
	SET_TABLE = "SET_TABLE",
	ADD_COLUMN = "ADD_COLUMN",
	ADD_OPERATOR = "ADD_OPERATOR",
	SET_RESULT = "SET_RESULT",
	SET_ANSWER = "SET_ANSWER",
	CHANGE_TAB_INDEX = "CHANGE_TAB_INDEX",
	UPDATE_SCORE = "UPDATE_SCORE",
	HANDLE_SUCCESS_MODAL = "HANDLE_SUCCESS_MODAL",
	CHANGE_QUESTION = "CHANGE_QUESTION",
	GAME_ENDED = "GAME_ENDED",
	PLAY_AGAIN = "PLAY_AGAIN",
	PAUSE_GAME = "PAUSE_GAME",
	RESUME_GAME = "RESUME_GAME",
}

export enum TagType {
	CLAUSE = "CLAUSE",
	KEYWORD = "KEYWORD",
	TABLENAME = "TABLENAME",
	COLUMN = "COLUMN",
}

export enum ErrorCause {
	IncorredSubmission = "IncorrectSubmission",
	QuestionCompleted = "QuestionCompleted",
	GameIsPaused = "GameIsPaused",
	Default = "Default",
}

export const ErrorMessages = {
	GAME_IS_PAUSED: "Game is Currently Paused",
	ATTEMPT_QUESTION_AGAIN:
		"Not allowed to attempt this question again. Try another question",
	INVALID_SUBMISSION: "Invalid Submission. Read the instructions Carefully",
};
