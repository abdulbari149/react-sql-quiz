import {
	AddColumnPayload,
	AddFilterPayload,
	AddTablePayload,
	IAnswer,
	IState,
	SetTablePayload,
} from "./interface";

// interface IActionController {
//   addToAnswer: (answer: IAnswer[], value: string) => IAnswer[];
//   addClause: (state: IState, payload: )
// }

export class ActionController {
	doesColumnExists(state: IState, text: string) {
		return state.table.columns.findIndex((c) => text.includes(c.name)) !== -1;
	}

	addToAnswer(answer: IAnswer[], value: string) {
		const updatedAnswer = [
			...answer,
			{
				id: answer.length + 1,
				content: value,
			},
		];
		return updatedAnswer;
	}

	replaceLastAnswer(answer: IAnswer[], lastAnswer: IAnswer) {
		return [...answer.slice(0, answer.length - 1), lastAnswer];
	}

	addClause = (state: IState, payload: { value: string }): IState => {
		const answer = this.addToAnswer(state.answer, payload.value);
		return { ...state, answer };
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
			lastContentText == state.table.alias ||
			lastContentText == state.table.name
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
}
