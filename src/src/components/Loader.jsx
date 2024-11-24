import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function Loader() {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<CircularProgress />
			<Typography
				sx={{ marginTop: 2 }}
				className="text-red-600 font-semibold text-sm mt-4"
			>
				A 10-second delay between each request is applied due to API request
				limits
			</Typography>
		</Box>
	);
}
