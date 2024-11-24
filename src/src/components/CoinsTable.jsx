import { Box, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CoinListTable from "./CoinListTable";
import { getCoinList } from "../services/apiCoin";
import Loader from "./Loader";
import ApiLimitErrorScreen from "./ApiLimitErrorScreen";
import { delay } from "../utils/commonFunctions";
import { useAPILimitError } from "../contexts/APILimitErrorContext";

const CoinsTable = () => {
	const [coinList, setCoinList] = useState([]);
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [isLoading, setIsLoading] = useState(false);
	const [searchInput, setSearchInput] = useState("");

	const { isAPILimitError, setIsAPILimitIsError } = useAPILimitError();

	function handleChangePage(newPage) {
		setPage(newPage);
	}

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(event.target.value);
		setPage(1); // Reset to first page
	};

	useEffect(() => {
		const fetchCoinList = async () => {
			setIsLoading(true);
			try {
				await delay(10000); // 10-second delay between requests
				const res = await getCoinList(page, rowsPerPage);
				if (res === 429) {
					setIsAPILimitIsError(true);
					// alert("API limit exceeded, please wait for 60 seconds!");
				}
				if (res.status === 200 && res.data) {
					setCoinList(res.data);
				}
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching coin list:", error);
				setIsLoading(false);
			}
		};
		fetchCoinList();
	}, [page, rowsPerPage, isAPILimitError]);

	const filteredCoinList = coinList.filter(
		(coin) =>
			coin.name && coin.name.toLowerCase().includes(searchInput.toLowerCase())
	);

	return (
		<Paper
			sx={{
				padding: 2,
				maxHeight: "37rem",
				minHeight: rowsPerPage === 5 ? "27rem" : "37rem",
				position: "relative",
				width: "40rem",
			}}
		>
			<Box className="flex justify-between">
				<Typography variant="h6">Cryptocurrency List</Typography>
				<TextField
					variant="outlined"
					placeholder="Search by name"
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
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
							padding: 0, // Remove padding inside the input field itself
						},
					}}
				></TextField>
			</Box>
			{isAPILimitError ? (
				<ApiLimitErrorScreen />
			) : (
				<Box>
					{isLoading ? (
						<Box
							sx={{
								height: "100%",
								width: "100%",
								marginTop: "10rem",
							}}
						>
							<Loader />
						</Box>
					) : (
						<CoinListTable
							coinList={filteredCoinList}
							page={page}
							rowsPerPage={rowsPerPage}
							handleChangePage={handleChangePage}
							handleChangeRowsPerPage={handleChangeRowsPerPage}
							isAPILimitError={isAPILimitError}
						/>
					)}
				</Box>
			)}
		</Paper>
	);
};

export default CoinsTable;
