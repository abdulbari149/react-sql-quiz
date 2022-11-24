import data from "../../../data/quiz.json";
import { useSqlQuiz } from "../core/EditorContext";
import "../sqleditor.css";

export const SqlBox = () => {
	const state = useSqlQuiz();
	return (
		<div className="sql-box">
			<p className="question"># {data[state.questionIndex].question}</p>
			<div className="answers">
				{state.answer.map((answ) => {
					return <p className="answer">{answ.content}</p>;
				})}
			</div>
		</div>
	);
};
