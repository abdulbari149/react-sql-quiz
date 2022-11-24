import { useEffect, useRef, useState } from "react";

export const useCountdown = (
	initialValue: number,
	onComplete: () => void,
) => {
	const [counter, setCounter] = useState(initialValue);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<number>();
	intervalRef.current = counter;

  const interrupt = () => {
    if(timer) {
      clearInterval(timer);
    }
  };

	useEffect(() => {
		const _timer = setInterval(() => {
			if(intervalRef.current === null || intervalRef.current === undefined) {
				clearInterval(_timer);
				return
			}
			if (intervalRef.current == 0) {
				clearInterval(_timer);
        onComplete()
			} else {
				setCounter(intervalRef.current - 1);
			}
		}, 1000);
		return () => clearInterval(_timer);
	}, []);

	return [counter, interrupt];
};
