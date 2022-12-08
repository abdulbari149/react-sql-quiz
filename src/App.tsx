import { useState, useEffect } from "react";
import "./styles.css";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Breif from "./components/Breif";
import Result from "./components/Result";
import SqlEditor from "./components/SqlEditor";
import "react-tabs/style/react-tabs.css";
import { useSqlQuiz } from "./components/SqlEditor/core/EditorContext";
import { Action } from "./components/SqlEditor/core/constants";
import "bootstrap/dist/css/bootstrap.css";
import { Timer } from "./components/SqlEditor/components/Timer";
import { Score } from "./components/SqlEditor/components/Score";
import Modal from "./components/shared/Modal";
import NextQuestionBtn from "./components/SqlEditor/components/NextQuestionBtn";
import Goal from "./components/SqlEditor/components/Goal";
window.process = process || {};

const tabs = [
	{
		id: 1,
		name: "Mission",
		tabComponent: <Breif />,
	},
	{
		id: 2,
		name: "SQL",
		tabComponent: <SqlEditor />,
	},
	{
		id: 3,
		name: "Result",
		tabComponent: <Result />,
	},
];

const tabStyles = {
	color: "white",
	border: "2px solid #e2e2e2",
	padding: "10px 35px",
	margin: "0 5px",
	background: "#44637f",
	borderRadius: "5px 5px 0 0",
};

export default function App() {
	const { dispatch, tabIndex, open, score, gameEnded, gameStarted } =
		useSqlQuiz();
	const [modalText, setModalText] = useState<string>("");

	const handleTabIndex = (index: number) => {
		dispatch({ type: Action.CHANGE_TAB_INDEX, payload: { index } });
	};

	const winText =
		"Congratulations. Your Answer is Correct. You have gained 20 points";
	const gameEndText = "Game Has been Ended, Your Score is " + score;

	useEffect(() => {
		setModalText(gameEnded ? gameEndText : winText);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [gameEnded]);

	return (
		<div className="main">
			<div
				style={{ display: tabIndex === 1 && gameStarted ? "block" : "none" }}
			>
				<Timer
					onComplete={() => {
						setModalText("oops. You ran out of time. Try Next Question");
						dispatch({ type: Action.HANDLE_SUCCESS_MODAL, payload: true });
					}}
				/>
				<Goal />

				<Score />
			</div>

			<Tabs selectedIndex={tabIndex} onSelect={handleTabIndex}>
				<TabList style={{ width: "700px", margin: "0 auto" }}>
					{tabs.map((t) => {
						return (
							<Tab tabIndex={t.name.toLowerCase()} key={t.id} style={tabStyles}>
								{t.name}
							</Tab>
						);
					})}
				</TabList>
				{tabs.map((t) => {
					return (
						<TabPanel style={{ marginTop: "20px" }}>{t.tabComponent}</TabPanel>
					);
				})}
			</Tabs>
			<Modal
				open={open}
				text={modalText}
				handleClose={() => {
					dispatch({ type: Action.HANDLE_SUCCESS_MODAL, payload: false });
					setModalText("");
				}}
			>
				{!gameEnded ? (
					<NextQuestionBtn dispatch={dispatch} />
				) : (
					<button
						className="btn btn-primary"
						style={{ display: "grid", margin: "0 auto", cursor: "pointer" }}
						onClick={() => dispatch({ type: Action.PLAY_AGAIN, payload: {} })}
					>
						Play Again
					</button>
				)}
			</Modal>
		</div>
	);
}

// interface ResultsTableProps {
// 	columns: any[];
// 	values: any[][];
// }

// const ResultsTable: React.FunctionComponent<ResultsTableProps> = ({
// 	columns,
// 	values,
// }) => {
// 	return (
// 		<table>
// 			<thead>
// 				<tr>
// 					{columns.map((columnName, i) => (
// 						<td key={i}>{columnName}</td>
// 					))}
// 				</tr>
// 			</thead>

// 			<tbody>
// 				{
// 					// values is an array of arrays representing the results of the query
// 					values.map((row, i) => (
// 						<tr key={i}>
// 							{row.map((value, i) => (
// 								<td key={i}>{value}</td>
// 							))}
// 						</tr>
// 					))
// 				}
// 			</tbody>
// 		</table>
// 	);
// };
