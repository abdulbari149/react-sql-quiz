import React from "react";
import { useError } from "../../../hooks/useError";
import { Button } from "../../shared/Button";
import { Action, ErrorMessages, ErrorCause } from "../core/constants";
import { useSqlQuiz } from "../core/EditorContext";
import { IOperators } from "../core/interface";
const { GAME_IS_PAUSED } = ErrorMessages;

interface Props {}

export const FilterAndValuesPanel: React.FunctionComponent<Props> = () => {
	const { operators, dispatch, pauseGame } = useSqlQuiz();
	const { throwError } = useError();
	const handleOperator = (
		e: React.MouseEvent<HTMLButtonElement>,
		op: IOperators
	) => {
		if(pauseGame) {
			return throwError(GAME_IS_PAUSED, ErrorCause.GameIsPaused)
		}
		dispatch({
			type: Action.ADD_OPERATOR,
			payload: { symbol: op.symbol },
		});
	};

	return (
		<div className="filter-panel">
			<div className="operators">
				{operators.map((op) => (
					<Button
						size="md"
						value={op.symbol}
						key={op.id}
						onClick={(e) => handleOperator(e, op)}
					/>
				))}
			</div>
		</div>
	);
};
