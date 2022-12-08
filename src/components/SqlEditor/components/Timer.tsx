import React, { useEffect, useRef, useState } from "react";
import { useAbsolutePosition } from "../../../hooks/useAbsolutePosition";
import { useSqlQuiz } from "../core/EditorContext";

interface Props {
	onComplete: () => void;
}

const timerStyles: React.CSSProperties = {
	position: "absolute",
	top: 60,
	marginTop: 20,
	fontSize: 15,
	fontWeight: "bold",
	color: "white",
	letterSpacing: 1.2,
	fontFamily: "monospace",
	textAlign: "center",
	border: "1px solid white",
	padding: "20px",
	borderRadius: "10px",
};

const COUNTER = 30;
export const Timer: React.FunctionComponent<Props> = ({ onComplete }) => {
	// const [counter, interrupt] = useCountdown(120, onComplete, reset);
	const { questionCompleted, questionIndex, gameStarted, pauseGame } =
		useSqlQuiz();
	const [counter, setCounter] = useState(COUNTER);
	const counterRef = useRef<number>();
	counterRef.current = counter;

	const { left } = useAbsolutePosition(() => {
		return window.innerWidth > 700 ? (window.innerWidth - 700) / 2 : 0;
	});

	useEffect(() => {
		setCounter(COUNTER);
		counterRef.current = COUNTER;
	}, [questionIndex]);

	useEffect(() => {
		const timer = setInterval(() => {
			if (counterRef.current === 0) {
				onComplete();
				return;
			}
			if (!questionCompleted && gameStarted && !pauseGame) {
				setCounter((prevC) => prevC - 1);
			}
			if (!gameStarted) {
				setCounter(COUNTER);
			}
		}, 1000);
		return () => clearInterval(timer);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [questionCompleted, gameStarted, pauseGame]);

	return (
		<div style={{ ...timerStyles, left: left + "px" }}>
			Time <br />
			{counter.toString()} seconds
		</div>
	);
};
