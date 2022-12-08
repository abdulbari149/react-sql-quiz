import { useState } from "react";
import { ErrorCause } from "../components/SqlEditor/core/constants";

export const useError = () => {
	const [error, setError] = useState<any>("");
	const [errorCause, setErrorCause] = useState<ErrorCause>(ErrorCause.Default);

	const throwError = (
		error: string,
		errorCause: ErrorCause = ErrorCause.Default
	) => {
		setError(error);
		setErrorCause(errorCause);
	};

	if (error) throw new Error(error, { cause: errorCause });
	return { throwError };
};
