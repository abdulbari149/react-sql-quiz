import { Button } from "../../shared/Button";
import { Action } from "../core/constants";
import { useSqlQuiz } from "../core/EditorContext";

interface Props {}

const keywords = [
	{
		id: 1,
		name: "DISTINCT",
		newLine: false,
	},
	{ id: 2, name: "LIMIT", newLine: true },
	{ id: 3, name: "ASC", newLine: false },
	{ id: 4, name: "DESC", newLine: false },
];

export const KeywordsPanel: React.FunctionComponent<Props> = () => {
	const { dispatch, pauseGame } = useSqlQuiz();

	const handleFilterClick = (
		e: React.MouseEvent<HTMLButtonElement>,
		value: string,
		newLine: boolean
	) => {
		if(pauseGame)
		dispatch({ type: Action.ADD_FILTER, payload: { value, newLine } });
	};

	return (
		<div className="keywords-panel">
			<div className="keywords">
				{keywords.map((w) => (
					<Button
						size="md"
						onClick={(e, value) => handleFilterClick(e, value, w.newLine)}
						value={w.name}
					/>
				))}
			</div>
		</div>
	);
};
