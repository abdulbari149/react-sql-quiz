import { useCallback, useState, useLayoutEffect } from "react";

export const useAbsolutePosition = (calc: () => number) => {
	const offsetCalculation = useCallback(() => {
		return calc();
	}, [calc]);
	const [left, setLeft] = useState<number>(offsetCalculation);

	useLayoutEffect(() => {
		const _resizer = () => {
			setLeft(offsetCalculation);
		};
		window.addEventListener("resize", _resizer);
		return () => window.removeEventListener("resize", _resizer);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return { left };
};
