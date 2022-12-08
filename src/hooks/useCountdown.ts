import { useEffect, useRef, useState } from "react";

export const useCountdown = (
	initialValue: number,
	onComplete: () => void,
	reset: boolean
): [number, () => void] => {
	const [counter, setCounter] = useState(initialValue);
	const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
	const intervalRef = useRef<number>();
	intervalRef.current = counter;

	const interrupt = () => {
		console.log({ timer });
		if (timer) {
			clearInterval(timer);
		}
	};

	const registerTimer = () => {
		const _timer = setInterval(() => {
			if (intervalRef.current === null || intervalRef.current === undefined) {
				clearInterval(_timer);
				return;
			}
			if (intervalRef.current == 0) {
				clearInterval(_timer);
				onComplete();
			} else {
				setCounter(intervalRef.current - 1);
			}
		}, 1000);
		console.log(_timer);
		setTimer(_timer)
	};

	useEffect(() => {
		if(!reset) return;
		registerTimer();
		return interrupt()
	}, [reset]);

	return [counter, interrupt];
};
