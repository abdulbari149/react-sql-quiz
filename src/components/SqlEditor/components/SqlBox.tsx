import React, { useMemo, useRef } from "react";
import data from "../../../data/quiz.json";
import { useError } from "../../../hooks/useError";
import { Action, ErrorCause, ErrorMessages } from "../core/constants";
import { useSqlQuiz } from "../core/EditorContext";
import "../sqleditor.css";

const { GAME_IS_PAUSED } = ErrorMessages;

export const SqlBox = () => {
	const state = useSqlQuiz();
	const { throwError } = useError();
	const answer = useMemo(() => {
		return state.answer.reduce((r, a) => r + a.content + "\n", "");
	}, [state.answer]);

	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		if (state.pauseGame) {
			return throwError(GAME_IS_PAUSED, ErrorCause.GameIsPaused);
		}
		const pointer = e.target.selectionStart;
		const element = e.target;
		window.requestAnimationFrame(() => {
			element.selectionStart = pointer;
			element.selectionEnd = pointer;
		});
		const newValues = e.target.value.split("\n");
		state.dispatch({
			type: Action.SET_ANSWER,
			payload: {
				value:
					newValues.length > 1 && newValues[newValues.length - 1] === ""
						? newValues.slice(0, newValues.length - 1)
						: newValues,
			},
		});
	};

	const showTextPointer = () => {
		textAreaRef.current?.focus();
	};

	return (
		<div onClick={showTextPointer} className="sql-box">
			<p className="question"># {data[state.questionIndex].question}</p>
			<textarea
				ref={textAreaRef}
				className="answers"
				value={answer}
				onChange={handleChange}
				autoFocus
				rows={4}
				cols={20}
			></textarea>
		</div>
	);
};
