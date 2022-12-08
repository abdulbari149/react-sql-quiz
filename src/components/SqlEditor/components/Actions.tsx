import "../sqleditor.css";
import { MdDelete } from "react-icons/md";
import { FiDelete, FiPause, FiPlay } from "react-icons/fi";
import { IoMdPlay } from "react-icons/io";
import React from "react";
import { useSqlQuiz } from "../core/EditorContext";
import { Action, ErrorCause, ErrorMessages } from "../core/constants";
import { useDatabase } from "../../../SQLDatabase";
import data from "../../../data/quiz.json";
import { useError } from "../../../hooks/useError";

const { ATTEMPT_QUESTION_AGAIN, GAME_IS_PAUSED, INVALID_SUBMISSION } =
	ErrorMessages;

export const Actions = () => {
	const { dispatch, answer, questionIndex, questionCompleted, pauseGame } =
		useSqlQuiz();
	const db = useDatabase();
	const { throwError } = useError();

	const handleDelete = (e: React.MouseEvent<HTMLDivElement>) => {
		if (pauseGame) {
			return throwError("Game is Currently Paused", ErrorCause.GameIsPaused);
		}
		dispatch({ type: Action.DELETE_CLAUSE, payload: null });
	};

	const handleClear = (e: React.MouseEvent<HTMLDivElement>) => {
		if (pauseGame) {
			return throwError("Game is Currently Paused", ErrorCause.GameIsPaused);
		}
		dispatch({ type: Action.CLEAR_SQL, payload: null });
	};

	const handleSemiColon = (e: React.MouseEvent<HTMLDivElement>) => {
		if (pauseGame) {
			return throwError("Game is Currently Paused", ErrorCause.GameIsPaused);
		}
		dispatch({
			type: Action.ADD_FILTER,
			payload: { value: "; ", newLine: false },
		});
	};

	const handlePausePlay = (e: React.MouseEvent<HTMLDivElement>) => {
		dispatch({ type: Action.PAUSE_GAME, payload: null });
	};

	const handleExecute = (e: React.MouseEvent<HTMLDivElement>) => {
		if (pauseGame) return throwError(GAME_IS_PAUSED, ErrorCause.GameIsPaused);
		if (questionCompleted)
			return throwError(ATTEMPT_QUESTION_AGAIN, ErrorCause.QuestionCompleted);

		const query = answer.reduce(
			(acc, currAns) => acc + currAns.content + " ",
			""
		);

		if (query === "") return throwError("Empty Query");

		const qs = data[questionIndex];
		try {
			const stmt = db.prepare(qs.answerQuery);
			stmt.bind(qs.bindParams);
			const result = [];
			while (stmt.step()) {
				result.push(stmt.getAsObject());
			}

			dispatch({
				type: Action.SET_RESULT,
				payload: { data: result, columns: stmt.getColumnNames() },
			});

			try {
				const compareStmt = db.prepare(
					`${data[questionIndex].answerQuery.replace(
						";",
						""
					)} UNION ${query.replace(";", "")}`
				);
				const compareStmtResult = [];
				while (compareStmt.step()) {
					compareStmtResult.push(compareStmt.get());
				}
				if (compareStmtResult.length !== result.length) {
					throw new Error();
				}
			} catch (error) {
				return throwError(INVALID_SUBMISSION, ErrorCause.IncorredSubmission);
			}

			dispatch({ type: Action.CHANGE_TAB_INDEX, payload: { index: 2 } });
			dispatch({ type: Action.UPDATE_SCORE, payload: {} });
			dispatch({ type: Action.HANDLE_SUCCESS_MODAL, payload: true });
			if (data.length - 1 === questionIndex) {
				dispatch({ type: Action.GAME_ENDED, payload: {} });
			}
		} catch (error) {
			return throwError(`${error}`);
		}
	};

	return (
		<>
			<div className="actions">
				<div className="semi-colon" onClick={handleSemiColon}>
					;
				</div>
				<div className="execute" onClick={handleExecute}>
					<IoMdPlay
						style={{ paddingRight: 8, top: 3, position: "relative" }}
						fontSize={20}
						color="white"
					/>
					Execute
				</div>
				<div className="pause-play" onClick={handlePausePlay}>
					{pauseGame ? (
						<FiPlay fontSize={25} color="white" />
					) : (
						<FiPause fontSize={25} color="white" />
					)}
				</div>
				<div className="clear" onClick={handleClear}>
					<MdDelete fontSize={25} color={"white"} />
				</div>
				<div className="delete" onClick={handleDelete}>
					<FiDelete fontSize={25} color="white" />
				</div>
			</div>
		</>
	);
};
