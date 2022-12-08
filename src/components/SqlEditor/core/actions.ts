import {
	AddColumnPayload,
	AddFilterPayload,
	AddOperatorPayload,
	AddTablePayload,
	ChangeTabIndexPayload,
	IAnswer,
	IState,
	SetResultPayload,
	SetTablePayload,
} from "./interface";
import { v4 } from "uuid";
import data from "../../../data/quiz.json";

// interface IActionController {
//   addToAnswer: (answer: IAnswer[], value: string) => IAnswer[];
//   addClause: (state: IState, payload: )
// }

export class ActionController {
	doesColumnExists(state: IState, text: string) {
		return state.table.columns.findIndex((c) => text.includes(c.name)) !== -1;
	}

	startGame(state: IState): IState {
		return {
			...state,
			gameStarted: true,
			questionCompleted: false,
			questionIndex: 0,
			gameEnded: false,
			pauseGame: false,
			open: false,
			score: 0,
			result: {
				columns: [],
				data: [],
				count: 0,
			},
			tabIndex: 1,
		};
	}

	addToAnswer(answer: IAnswer[], value: string) {
		const updatedAnswer = [
			...answer,
			{
				id: v4(),
				content: value,
			},
		];
		return updatedAnswer;
	}

	replaceLastAnswer(answer: IAnswer[], lastAnswer: IAnswer) {
		return [...answer.slice(0, answer.length - 1), lastAnswer];
	}

	addClause = (state: IState, payload: { value: string }): IState => {
		let lastAnswer =
			state.answer.length > 0
				? { ...state.answer[state.answer.length - 1] }
				: { id: v4(), content: "" };
		if (lastAnswer.content === "") {
			lastAnswer.content = payload.value;
			return {
				...state,
				answer: this.replaceLastAnswer(state.answer, lastAnswer),
			};
		} else {
			return {
				...state,
				answer: this.addToAnswer(state.answer, payload.value),
			};
		}
	};

	deleteClause = (state: IState): IState => {
		const lastAnswer = { ...state.answer[state.answer.length - 1] };
		let content = lastAnswer.content.trim().split(" ");
		if (content.length > 1) {
			content = content.slice(0, content.length - 1);
			lastAnswer.content = content.join(" ");
			return {
				...state,
				answer: this.replaceLastAnswer(state.answer, lastAnswer),
			};
		}
		return {
			...state,
			answer: state.answer.slice(0, state.answer.length - 1),
		};
	};

	addCharacter(state: IState, { value }: { value: string }): IState {
		let answers = [...state.answer];

		if (value === "\n") {
			const newAnswer: IAnswer = {
				id: v4(),
				content: "",
			};
			answers = [...answers, newAnswer];
		} else {
			const lastAnswer =
				answers.length > 0
					? { ...answers[answers.length - 1] }
					: {
							id: v4(),
							content: "",
					  };
			lastAnswer.content += value;
			answers = [...(answers?.slice(0, answers.length - 1) ?? []), lastAnswer];
		}
		return {
			...state,
			answer: answers,
		};
	}

	deleteCharacter(state: IState): IState {
		const lastAnswer = { ...state.answer[state.answer.length - 1] };
		let content = lastAnswer.content.trim().split("");
		if (content.length > 1) {
			lastAnswer.content = lastAnswer.content.slice(
				0,
				lastAnswer.content.length - 1
			);
			return {
				...state,
				answer: this.replaceLastAnswer(state.answer, lastAnswer),
			};
		}
		return {
			...state,
			answer: state.answer.slice(0, state.answer.length - 1),
		};
	}

	clearClause = (state: IState): IState => {
		return {
			...state,
			answer: [],
		};
	};

	addFilter = (state: IState, payload: AddFilterPayload): IState => {
		if (payload.newLine) {
			const answer = this.addToAnswer(state.answer, payload.value);
			return { ...state, answer };
		}
		const lastAnswer = { ...state.answer[state.answer.length - 1] };
		lastAnswer.content += " " + payload.value;
		const updatedAnswer = [
			...state.answer.slice(0, state.answer.length - 1),
			lastAnswer,
		];
		return {
			...state,
			answer: updatedAnswer,
		};
	};

	addTable(state: IState, payload: AddTablePayload): IState {
		const lastAnswer = {
			...state.answer[state.answer.length - 1],
		};
		const contentArray = lastAnswer.content.trim().split(" ");
		const lastContentText = contentArray[contentArray.length - 1];
		console.log({
			lastContentText,
			index: state.table.columns.findIndex((c) =>
				c.name.includes(lastContentText)
			),
		});
		if (
			lastContentText === "*" ||
			this.doesColumnExists(state, lastContentText)
		) {
			lastAnswer.content += ` , ${payload.value}`;
		} else {
			lastAnswer.content += ` ${payload.value}`;
		}
		return {
			...state,
			answer: [...state.answer.slice(0, state.answer.length - 1), lastAnswer],
		};
	}

	addColumn(state: IState, payload: AddColumnPayload): IState {
		const lastAnswer = {
			...state.answer[state.answer.length - 1],
		};
		const contentArray = lastAnswer.content.trim().split(" ");
		const lastContentText = contentArray[contentArray.length - 1].trim();
		console.log({ contentArray, lastContentText });
		if (
			lastContentText === state.table.alias ||
			lastContentText === state.table.name
		) {
			lastAnswer.content = lastAnswer.content.trim() + "." + payload.value;
		} else if (
			lastContentText === "*" ||
			this.doesColumnExists(state, lastContentText)
		) {
			lastAnswer.content += ` , ${payload.value}`;
		} else {
			lastAnswer.content += ` ${payload.value}`;
		}
		return {
			...state,
			answer: this.replaceLastAnswer(state.answer, lastAnswer),
		};
	}

	setTable(state: IState, payload: SetTablePayload): IState {
		return {
			...state,
			table: payload,
		};
	}

	addOperator(state: IState, payload: AddOperatorPayload): IState {
		const lastAnswer = {
			...state.answer[state.answer.length - 1],
		};
		if (Object.keys(lastAnswer).length === 0) {
			throw new Error("Error displaying operator");
		}
		lastAnswer.content += ` ${payload.symbol} `;
		return {
			...state,
			answer: this.replaceLastAnswer(state.answer, lastAnswer),
		};
	}

	setResult(state: IState, payload: SetResultPayload): IState {
		return {
			...state,
			result: {
				data: payload.data,
				columns: payload.columns,
				count: payload.data.length,
			},
		};
	}

	setAnswer(state: IState, payload: { value: string[] }): IState {
		console.log(payload.value);
		return {
			...state,
			answer: payload.value.map((v) => ({ id: v4(), content: v })),
		};
	}

	changeTabIndex(state: IState, payload: ChangeTabIndexPayload): IState {
		return {
			...state,
			tabIndex: payload.index,
		};
	}

	updateScore(state: IState): IState {
		return {
			...state,
			score: state.score + 20,
			questionCompleted: true,
		};
	}

	nextQuestion(state: IState): IState {
		return {
			...state,
			questionIndex:
				state.questionIndex <= data.length - 2
					? state.questionIndex + 1
					: state.questionIndex,
			answer: [],
			result: { data: [], count: 0, columns: [] },
			questionCompleted: false,
			tabIndex: 1,
			open: false,
		};
	}

	handleSuccessModal(state: IState, payload: boolean): IState {
		return {
			...state,
			open: payload,
		};
	}

	gameEnded(state: IState): IState {
		return {
			...state,
			answer: [],
			open: true,
			questionCompleted: true,
			gameEnded: true,
			table: { alias: "", columns: [], name: "" },
			gameStarted: false,
		};
	}

	playAgain(state: IState): IState {
		return {
			...state,
			questionCompleted: false,
			gameEnded: false,
			gameStarted: true,
			questionIndex: 0,
			open: false,
			score: 0,
			result: {
				columns: [],
				data: [],
				count: 0,
			},
			tabIndex: 1,
			pauseGame: true,
		};
	}
	pausePlay(state: IState): IState {
		return {
			...state,
			pauseGame: !state.pauseGame,
		};
	}

	resumeGame(state: IState): IState {
		return {
			...state,
			pauseGame: false,
		}
	}

}
