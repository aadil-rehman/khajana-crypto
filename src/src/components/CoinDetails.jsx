import React, { useEffect, useState } from "react";
import {
	Box,
	Typography,
	Select,
	MenuItem,
	Paper,
	Divider,
	LinearProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { getCoinDetails, getCoinPriceHistory } from "../services/apiCoin";
import { format } from "date-fns";
import PriceHistoryChart from "./PriceHistoryChart";
import { delay, truncateString } from "../utils/commonFunctions";
import ApiLimitErrorScreen from "./ApiLimitErrorScreen";
import { useAPILimitError } from "../contexts/APILimitErrorContext";
import Loader from "./Loader";

const CoinDetail = () => {
	const { id } = useParams(); // Extract coin ID from the URL
	const [coinDetails, setCoinDetails] = useState(null);
	const [priceHistory, setPriceHistory] = useState([]);
	const [timeframe, setTimeframe] = useState(7);
	const [isLoading, setIsLoading] = useState(false);

	const { isAPILimitError, setIsAPILimitIsError } = useAPILimitError();

	console.log(id);

	// Fetch coin details
	useEffect(() => {
		const fetchCoinDetails = async () => {
			setIsLoading(true);
			try {
				await delay(10000); // 10-second delay between requests
				const res = await getCoinDetails(id);
				setCoinDetails(res?.data || {});
				setIsLoading(false);
				if (res === 429) {
					setIsAPILimitIsError(true);
					// alert("API limit exceeded, please wait for 60 seconds!");
				}
			} catch (error) {
				console.error("Error fetching coin details:", error);
				setIsLoading(false);
			}
		};
		fetchCoinDetails();
	}, [id, isAPILimitError]);

	console.log(timeframe);
	console.log(priceHistory);

	// Fetch price history
	useEffect(() => {
		const fetchPriceHistory = async () => {
			setIsLoading(true);
			try {
				await delay(10000); // 10-second delay between requests
				const res = await getCoinPriceHistory(id, timeframe);
				console.log(res);
				setPriceHistory(res?.prices || []);
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching price history:", error);
				setIsLoading(false);
			}
		};
		fetchPriceHistory();
	}, [id, timeframe, isAPILimitError]);

	// Handle timeframe selection
	const handleTimeframeChange = (event) => {
		setTimeframe(event.target.value);
	};

	const formattedData = priceHistory?.map(([timestamp, price]) => ({
		date: format(new Date(timestamp), "dd-MM-yyyy"), // Format as DD-MM-YYYY
		price: price.toFixed(2), // Keep two decimal places
	}));

	return (
		<Paper
			sx={{ padding: 3, minHeight: "30rem", minWidth: "40rem", margin: "auto" }}
		>
			{isLoading ? (
				<Box className="mt-20">
					<Loader />
				</Box>
			) : (
				<Box>
					{isAPILimitError ? (
						<ApiLimitErrorScreen />
					) : (
						<>
							{/* Coin Details */}
							<Box>
								<Typography variant="h4" gutterBottom>
									{coinDetails?.name} ({coinDetails?.symbol?.toUpperCase()})
								</Typography>
								<Typography variant="body1" color="textSecondary" paragraph>
									{truncateString(coinDetails?.description?.en, 600) ||
										"No description available."}
								</Typography>
							</Box>

							<Divider sx={{ my: 2 }} />

							{/* Market Information */}
							<Box
								display="flex"
								justifyContent="space-between"
								flexWrap="wrap"
							>
								<Typography variant="body1">
									<b>Market Cap Rank:</b>{" "}
									{coinDetails?.market_cap_rank || "N/A"}
								</Typography>
								<Typography variant="body1">
									<b>Trading Volume:</b> $
									{coinDetails?.market_data?.total_volume?.usd?.toLocaleString() ||
										"N/A"}
								</Typography>
							</Box>

							<Divider sx={{ my: 2 }} />

							{/* Price History */}
							<Box>
								<Box
									display="flex"
									justifyContent="space-between"
									alignItems="center"
								>
									<Typography variant="h6">Price History</Typography>
									<Select
										value={timeframe}
										onChange={handleTimeframeChange}
										sx={{
											padding: 0,
											fontSize: "1rem",
											"& .MuiInputBase-root": {
												padding: 0, // Remove internal padding
											},
											"& .MuiOutlinedInput-root": {
												padding: " 0.2rem 0.5rem",
											},
											"& .MuiInputBase-input": {
												padding: "0.5rem 1rem", // Remove padding inside the input field itself
											},
										}}
									>
										<MenuItem value={1}>1 Day</MenuItem>
										<MenuItem value={7}>7 Days</MenuItem>
										<MenuItem value={30}>1 Month</MenuItem>
										<MenuItem value={90}>3 Months</MenuItem>
										<MenuItem value={365}>1 Year</MenuItem>
									</Select>
								</Box>
								{/* Price history data */}
								<Box mt={2}>
									{priceHistory.length > 0 ? (
										<Box>
											<Typography variant="body2" className="mb-4">
												Price History data available :
											</Typography>
											<PriceHistoryChart data={formattedData} />
										</Box>
									) : (
										<Typography variant="body2" color="textSecondary">
											No price history data available.
										</Typography>
									)}
								</Box>
							</Box>
						</>
					)}
				</Box>
			)}
		</Paper>
	);
};

export default CoinDetail;
