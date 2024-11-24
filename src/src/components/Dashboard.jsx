import { Box, Container, Grid2, Paper, Typography } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
	return (
		<Box sx={{ minHeight: "100vh" }}>
			<Container maxWidth="lg" sx={{ flexGrow: 1, my: 4 }}>
				<Grid2 container spacing={4}>
					{/*Sidebar */}
					<Grid2 item xs={12} md={3}>
						<Paper sx={{ padding: 2 }}>
							<Typography variant="h6">Filters</Typography>
							{/* Add Filters or Links */}
						</Paper>
					</Grid2>
					{/* Main Content */}
					<Grid2 item xs={12} md={9}>
						<Outlet />
					</Grid2>
				</Grid2>
			</Container>
		</Box>
	);
};

export default Dashboard;
