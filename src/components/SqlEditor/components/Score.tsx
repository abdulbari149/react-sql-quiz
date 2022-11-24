import { useSqlQuiz } from "../core/EditorContext";

interface Props {}

export const Score: React.FunctionComponent<Props> = () => {
	const { score } = useSqlQuiz();
	const scoreStyles: React.CSSProperties = {
		position: "absolute",
		right: 0,
		top: 0,
		marginRight: 20,
		marginTop: 20,
		fontSize: 20,
		fontWeight: "bold",
		color: "white",
		letterSpacing: 1.2,
		fontFamily: "monospace",
	};
	return <div style={scoreStyles}>Score: {score.toString()}</div>;
};
