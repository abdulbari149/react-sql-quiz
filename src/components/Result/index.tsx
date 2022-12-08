import { useSqlQuiz } from "../SqlEditor/core/EditorContext";
import Table from "react-bootstrap/Table";
import { CSSProperties, useMemo } from "react";
import { Action } from "../SqlEditor/core/constants";
import './result.css'
const containerStyles = {
	width: "fit-content",
	minWidth: "700px",
	margin: "0 auto",
	padding: "12px 15px",
	height: "85vh",
};

const noRecordsFoundStyles: CSSProperties = {
	...containerStyles,
	display: "grid",
	placeContent: "center",
	fontSize: "20px",
	letterSpacing: "1.2px",
	color: "#f2f2f2",
	fontWeight: "bold",
	fontFamily: "Poppins",
};

const mainContainerStyles: CSSProperties = {
	...containerStyles,
	overflowY: 'auto'
};

const cellStyles: CSSProperties = {
	maxWidth: "120px",
	overflowWrap: "break-word",
	
};

const Result = () => {
	const { result, dispatch, gameEnded, questionCompleted } = useSqlQuiz();

	const idColumnName = useMemo(() => {
		return result.columns.find((c) => c.toLowerCase().includes("id"));
	}, [result.columns]);

	if (result.data.length === 0) {
		return <div style={noRecordsFoundStyles}>No Records Found</div>;
	}

	return (
		<>
			<div
				ref={(el) => {
					if (el) {
						el.style.setProperty("overflow", "scroll", "!important");
					}
				}}
				style={mainContainerStyles}
			>
				<Table
					border={2}
					cellSpacing={20}
					cellPadding={10}
					bordered
					hover
					size="sm"
				>
					<thead className="thead-light">
						<tr className="table-head">
							{result.columns.map((r) => (
								<th
									scope="col"
									style={cellStyles}
									key={r}
								>
									{r}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{result.data.map((item, idx) => {
							const id =
								idColumnName !== undefined && idColumnName in item
									? item[idColumnName]
									: JSON.stringify(item) + Date.now();

							return (
								<tr className="table-row" key={id}>
									{Object.keys(item).map((k) => (
										<td style={cellStyles} key={`${id}-${k}`}>
											{item[k]}
										</td>
									))}
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
			{!gameEnded && questionCompleted ? (
				<div className="p-2 d-flex align-items-center justify-content-center">
					<button
						className="btn btn-success"
						onClick={() =>
							dispatch({ type: Action.CHANGE_QUESTION, payload: {} })
						}
					>
						Next Question
					</button>
				</div>
			) : (
				<div className="p-2 d-flex align-items-center justify-content-center">
					<button
						className="btn btn-primary"
						onClick={() => dispatch({ type: Action.PLAY_AGAIN, payload: {} })}
					>
						Play Again
					</button>
				</div>
			)}
		</>
	);
};

export default Result;
