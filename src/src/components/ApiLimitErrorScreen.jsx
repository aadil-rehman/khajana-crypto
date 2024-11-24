import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useAPILimitError } from "../contexts/APILimitErrorContext";

const ApiLimitErrorScreen = () => {
	const {
		remainingTime,
		setRemainingTime,
		isAPILimitError,
		setIsAPILimitIsError,
	} = useAPILimitError();

	useEffect(() => {
		if (!isAPILimitError) return; // If no API limit error, do nothing

		// Only start the countdown if it's not already running
		const interval = setInterval(() => {
			setRemainingTime((prevTime) => {
				if (prevTime <= 1) {
					clearInterval(interval); // Stop the countdown
					setIsAPILimitIsError(false); // Reset the error state after the countdown
					return 60; // Reset timer for the next time
				}
				return prevTime - 1; // Decrement the time by 1 second
			});
		}, 1000);

		// Cleanup the interval on component unmount or when error state changes
		return () => clearInterval(interval);
	}, [isAPILimitError, setIsAPILimitIsError, setRemainingTime]);

	return (
		<Box className="flex flex-col justify-center items-center mt-40 text-red-600">
			{isAPILimitError ? (
				<>API limit exceeded, please wait for {remainingTime} seconds...</>
			) : null}
		</Box>
	);
};

export default ApiLimitErrorScreen;
