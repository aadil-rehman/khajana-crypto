import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3";

export async function getCoinList(page, rowsPerPage) {
	try {
		const response = await axios.get(`${BASE_URL}/coins/markets`, {
			params: {
				vs_currency: "usd", // Specify the currency
				order: "market_cap_desc", // Order by market cap
				per_page: rowsPerPage, // Limit to rowsPerPage results per page
				page: page, // Fetch the first page
			},
			headers: {
				"Content-Type": "application/json",
			},
		});

		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		if (error.code === "ERR_NETWORK") {
			console.error(`Rate limit exceeded. Retry after 60 seconds.`);
			return 429;
		} else {
			console.error("An error occurred:", error.message);
		}
		console.error("API request error:", error);
	}
}

//Get coin data
export async function getCoinDetails(id) {
	try {
		const response = await axios.get(`${BASE_URL}/coins/${id}`, {
			headers: {
				"Content-Type": "application/json",
			},
		});

		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		if (error.code === "ERR_NETWORK") {
			console.error(`Rate limit exceeded. Retry after 60 seconds.`);
			return 429;
		} else {
			console.error("An error occurred:", error.message);
		}
		console.error("API request error:", error);
	}
}

export async function getCoinPriceHistory(coinId, days) {
	try {
		const response = await axios.get(
			`${BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=daily&precision=2' `,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (response.status === 200 && response.data) {
			return response.data;
		} else {
			console.error("Failed to fetch price history:", response);
			return null;
		}
	} catch (error) {
		console.error("Error fetching price history:", error);
		if (error.code === "ERR_NETWORK") {
			console.error(`Rate limit exceeded. Retry after 60 seconds.`);
			return 429;
		} else {
			console.error("An error occurred:", error.message);
		}
		console.error("API request error:", error);
	}
}
