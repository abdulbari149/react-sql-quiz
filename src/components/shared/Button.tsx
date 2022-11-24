import React from "react";

type Size = "sm" | "md" | "lg";

interface Props {
	value: string;
	onClick: (e: React.MouseEvent<HTMLButtonElement>, value: string) => void;
	size?: Size;
}

const widthSize: Record<Size, string> = {
	sm: "60px",
	md: "120px",
	lg: "180px",
};

const heightSize: Record<Size, string> = {
	sm: "30px",
	md: "40px",
	lg: "50px",
};

export const Button: React.FunctionComponent<Props> = ({
	value,
	onClick,
	size = "sm",
}) => {
	const buttonStyles: React.CSSProperties = {
		padding: "1px 0px",
		width: widthSize[size],
		height: heightSize[size],
		border: "1px solid #ecebeb",
		margin: "2px 0px",
		borderRadius: "5px",
		backgroundColor: "transparent",
		color: "white",
		fontSize: "16px",
		cursor: "pointer",
	};
	return (
		<button style={buttonStyles} onClick={(e) => onClick(e, value)}>
			{value}
		</button>
	);
};
