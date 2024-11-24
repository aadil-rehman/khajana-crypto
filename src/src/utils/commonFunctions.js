export function getDateDaysBack(days) {
	const date = new Date(); // Get the current date
	date.setDate(date.getDate() - days); // Subtract the given number of days

	// Format the date as DD-MM-YYYY
	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
	const year = date.getFullYear();

	return `${day}-${month}-${year}`;
}

export function truncateString(str, maxLength) {
	// Check if the string is longer than the specified maxLength
	if (str?.length > maxLength) {
		// Return the truncated string with an ellipsis at the end
		return str.substring(0, maxLength) + "...";
	} else {
		// Return the original string if it's not longer than maxLength
		return str;
	}
}

export function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
