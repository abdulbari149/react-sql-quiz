import { useMemo } from "react";
import { useTimer } from "react-timer-hook";
import { useCountdown } from "../../../hooks/useCountdown";

interface Props {
	onComplete: () => void;
}

export const Timer: React.FunctionComponent<Props> = ({ onComplete }) => {
	const [counter, interrupt] = useCountdown(120, onComplete);

  const timerStyles: React.CSSProperties = {
    position: 'absolute',
    top:  0,
    left: 10,
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 1.2,
    fontFamily: 'monospace'
  }

	return <div style={timerStyles}>Timer: {counter.toString()}</div>;
};
