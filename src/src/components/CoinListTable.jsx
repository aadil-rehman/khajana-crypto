import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import React, { useState } from "react";
import TablePagination from "./TablePagination";
import { useNavigate, useSearchParams } from "react-router-dom";

const CoinListTable = ({
	page,
	rowsPerPage,
	handleChangePage,
	handleChangeRowsPerPage,
	coinList,
	isAPILimitError,
}) => {
	console.log(coinList);

	const navigate = useNavigate();

	function handleRowClick(coinId) {
		navigate(`/dashboard/coins/${coinId}`);
	}

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				height: "33rem",
			}}
		>
			<TableContainer
				style={{
					flex: "1 1 auto",
					overflowY: "auto",
					scrollbarWidth: "none",
				}}
			>
				<Table stickyHeader>
					<TableHead>
						<TableRow className="bg-gray-50">
							<TableCell>Coin</TableCell>
							<TableCell>Symbol</TableCell>
							<TableCell>Price</TableCell>
							<TableCell>24h Change</TableCell>
							<TableCell>Market Cap</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{coinList?.map((coin) => (
							<TableRow
								key={coin.id}
								className="bg-inherit hover:bg-gray-50 hover:cursor-pointer active:bg-gray-100"
								onClick={() => handleRowClick(coin.id)}
							>
								<TableCell>{coin.name}</TableCell>
								<TableCell>{coin.symbol.toUpperCase()}</TableCell>
								<TableCell>{coin.current_price.toFixed(2)}</TableCell>
								<TableCell
									style={{
										color:
											coin.price_change_percentage_24h > 0 ? "green" : "red",
									}}
								>
									{coin.price_change_percentage_24h.toFixed(2)}%
								</TableCell>
								<TableCell align="right">
									{coin.market_cap.toLocaleString()}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				page={page}
				handleChangePage={handleChangePage}
				rowsPerPage={rowsPerPage}
				handleChangeRowsPerPage={handleChangeRowsPerPage}
				totalRows={1000}
				isAPILimitError={isAPILimitError}
			/>
		</div>
	);
};

export default CoinListTable;
