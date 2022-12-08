import React from "react";
import { FiPlay } from "react-icons/fi";
import Modal, { AppModalProps } from "../../shared/Modal";
import { Action, ErrorCause } from "../core/constants";
import { useSqlQuiz } from "../core/EditorContext";
import { IAction } from "../core/interface";
import NextQuestionBtn from "./NextQuestionBtn";

type WithDispatch<T> = T & { dispatch: React.Dispatch<IAction> | (() => void) };
interface ErrorState {
	error: string;
	hasError: boolean;
	isOpen: boolean;
	errorCause: ErrorCause;
}

const IncorrectSubmissionError: React.FunctionComponent<{
	handleClose: () => void;
}> = ({ handleClose }) => {
	return (
		<button
			className="btn btn-danger"
			style={{ display: "grid", margin: "0 auto", cursor: "pointer" }}
			onClick={handleClose}
		>
			Try Again
		</button>
	);
};

const QuestionCompletedError: React.FunctionComponent<{
	dispatch: React.Dispatch<IAction> | (() => void);
	handleClose: () => void;
}> = ({ dispatch, handleClose }) => {
	return <NextQuestionBtn dispatch={dispatch} onClick={(e) => handleClose()} />;
};

interface GameIsNotPausedErrorProps {
	handleClose: () => void
}

const GameIsPausedError: React.FunctionComponent<
	WithDispatch<GameIsNotPausedErrorProps>
> = ({ dispatch, handleClose }) => {
	const handleClick = () => {
		dispatch({ type: Action.RESUME_GAME, payload: null });
		handleClose();
	};
	return (
		<button className="btn btn-info" onClick={handleClick}>
			<FiPlay fontSize={25} color="white" /> Resume
		</button>
	);
};

interface DefaultErrorProps {}

const DefaultError: React.FunctionComponent<
	WithDispatch<DefaultErrorProps>
> = ({ dispatch }) => {
	const handleClick = () => {
		dispatch({
			type: Action.CHANGE_TAB_INDEX,
			payload: { index: 2 },
		});
	};
	return <button onClick={handleClick}> View Result</button>;
};

const ErrorModal: React.FunctionComponent<
	AppModalProps & Pick<ErrorState, "errorCause">
> = ({ open, text, handleClose, errorCause }) => {
	const { dispatch } = useSqlQuiz();

	const contentOnCause: Record<ErrorCause, JSX.Element> = {
		IncorrectSubmission: <IncorrectSubmissionError handleClose={handleClose} />,
		QuestionCompleted: (
			<QuestionCompletedError dispatch={dispatch} handleClose={handleClose} />
		),
		GameIsPaused: <GameIsPausedError dispatch={dispatch} handleClose={handleClose} />,
		Default: <DefaultError dispatch={dispatch} />,
	};

	return (
		<Modal open={open} text={text} handleClose={handleClose}>
			{contentOnCause[errorCause]}
		</Modal>
	);
};

export class ErrorBoundary extends React.Component<
	React.PropsWithChildren<{}>,
	ErrorState
> {
	constructor(props: React.PropsWithChildren<{}>) {
		super(props);
		this.state = {
			error: "",
			hasError: false,
			isOpen: false,
			errorCause: ErrorCause.Default,
		};
	}

	static getDerivedStateFromError(error: Error | any) {
		return {
			hasError: true,
		};
	}

	componentDidCatch(error: Error) {
		this.setState((prevState) => {
			const newState = {
				...prevState,
				error: `${error.message}`,
				isOpen: true,
			};
			if (error.cause) {
				newState.errorCause = error.cause as ErrorCause;
			}
			console.log(JSON.stringify(error.cause));
			return newState;
		});
	}

	handleClose() {
		this.setState({ isOpen: false, hasError: false });
	}

	render() {
		const {
			error,
			hasError,
			isOpen,
			errorCause = ErrorCause.Default,
		} = this.state;
		if (hasError) {
			return (
				<>
					<ErrorModal
						open={isOpen}
						text={error}
						handleClose={this.handleClose.bind(this)}
						errorCause={errorCause}
					/>
					{this.props.children}
				</>
			);
		}
		return <>{this.props.children}</>;
	}
}
