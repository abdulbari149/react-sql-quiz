import React, { CSSProperties, useRef } from "react";
import { useAbsolutePosition } from "../../../hooks/useAbsolutePosition";

const goalStyles: CSSProperties = {
	position: "absolute",
	width: "250px",
	top: 0,
	marginRight: 20,
	marginTop: 10,
	fontSize: 16,
	fontWeight: "bold",
	color: "white",
	letterSpacing: 1.2,
	fontFamily: "monospace",
	textAlign: "center",
	padding: "10px",
};

const Goal = () => {
	const goalRef = useRef<HTMLDivElement>(null);
	const { left } = useAbsolutePosition(() => {
		return window.innerWidth > 700
			? window.innerWidth / 2 + 350 - 250
			: window.innerWidth - 260;
	});

	return (
		<div ref={goalRef} style={{ ...goalStyles, left: left + "px" }}>
			Goal: Get 500 Points
		</div>
	);
};

export default Goal;
