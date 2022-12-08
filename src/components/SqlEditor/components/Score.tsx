import { useAbsolutePosition } from "../../../hooks/useAbsolutePosition";
import { useSqlQuiz } from "../core/EditorContext";

interface Props {}

const scoreStyles: React.CSSProperties = {
	position: "absolute",
	top: 50,
	marginRight: 20,
	marginTop: 20,
	fontSize: 20,
	fontWeight: "bold",
	color: "white",
	letterSpacing: 1.2,
	fontFamily: "monospace",
	textAlign: "center",
	border: "1px solid white",
	padding: "20px",
	borderRadius: "10px",
};

export const Score: React.FunctionComponent<Props> = () => {
	const { score } = useSqlQuiz();

	const { left } = useAbsolutePosition(() => {
		return window.innerWidth > 700 ? window.innerWidth / 2 + 350 - 110 : 0;
	});
	return (
		<div style={{ ...scoreStyles, left: left + "px" }}>
			Score <br />
			{score.toString()}
		</div>
	);
};
