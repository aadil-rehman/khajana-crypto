import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, IconButton, MenuItem, Select, Typography } from "@mui/material";
import React from "react";

const rowsPerPageOptions = [5, 10, 25, -1]; // Use numeric values for consistency

const CustomTablePagination = ({
	handleChangePage,
	page,
	rowsPerPage,
	totalRows,
	handleChangeRowsPerPage,
	isError,
}) => {
	const startRow = (page - 1) * rowsPerPage + 1;
	const endRow =
		rowsPerPage === -1 ? totalRows : Math.min(totalRows, page * rowsPerPage);

	return (
		<Box
			className="flex gap-3 justify-between items-center p-2"
			sx={{ borderTop: "1px solid #e0e0e0", backgroundColor: "#f9f9f9" }}
		>
			<Box className="flex gap-2 items-center">
				<Typography variant="body2" color="textSecondary">
					Rows per page:
				</Typography>
				<Select
					value={rowsPerPage}
					onChange={handleChangeRowsPerPage}
					size="small"
					disabled={isError}
					sx={{
						maxHeight: "30px",
						fontSize: "14px",
						backgroundColor: "white",
						"& .MuiSelect-select": { padding: "5px 10px" },
					}}
				>
					{rowsPerPageOptions.map((option) => (
						<MenuItem key={option} value={option}>
							{option === -1 ? "All" : option}
						</MenuItem>
					))}
				</Select>
			</Box>
			<Box className="flex gap-2 items-center">
				<Typography variant="body2" color="textSecondary">
					{startRow}-{endRow} of {totalRows}
				</Typography>
				<IconButton
					size="small"
					onClick={() => handleChangePage(page - 1)}
					disabled={page === 1 || isError}
				>
					<ChevronLeftIcon />
				</IconButton>
				<IconButton
					size="small"
					onClick={() => handleChangePage(page + 1)}
					disabled={endRow >= totalRows || isError}
				>
					<ChevronRightIcon />
				</IconButton>
			</Box>
		</Box>
	);
};

export default CustomTablePagination;
