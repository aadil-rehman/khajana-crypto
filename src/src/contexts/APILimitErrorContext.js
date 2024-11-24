import { createContext, useContext, useEffect, useState } from "react";
import { delay } from "../utils/commonFunctions";

const APILimitErrorContext = createContext();

function APILimitErrorProvider({ children }) {
	const [isAPILimitError, setIsAPILimitIsError] = useState(false);
	const [remainingTime, setRemainingTime] = useState(60);

	useEffect(() => {
		if (isAPILimitError) {
			setRemainingTime(60); // Reset countdown on API limit error
		}
	}, [isAPILimitError]);

	return (
		<APILimitErrorContext.Provider
			value={{
				isAPILimitError,
				setIsAPILimitIsError,
				remainingTime,
				setRemainingTime,
			}}
		>
			{children}
		</APILimitErrorContext.Provider>
	);
}

function useAPILimitError() {
	const context = useContext(APILimitErrorContext);
	if (context === undefined) {
		throw new Error("APILimitErrorContext was used APILimitErrorProvider");
	}

	return context;
}

export { useAPILimitError, APILimitErrorProvider };
