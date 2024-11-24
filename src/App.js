import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AppLayout from "./src/components/AppLayout";
import Dashboard from "./src/components/Dashboard";
import CoinsTable from "./src/components/CoinsTable";
import CoinDetails from "./src/components/CoinDetails";
import { APILimitErrorProvider } from "./src/contexts/APILimitErrorContext";

function App() {
	return (
		<APILimitErrorProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<AppLayout />}>
						{/* Redirect "/" to "/dashboard/coins" */}
						<Route index element={<Navigate to="/dashboard/coins" />} />

						<Route path="dashboard" element={<Dashboard />}>
							{/* Redirect "/dashboard" to "/dashboard/coins" */}
							<Route index element={<Navigate to="coins" />} />
							<Route path="coins" element={<CoinsTable />} />
							<Route path="coins/:id" element={<CoinDetails />} />
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</APILimitErrorProvider>
	);
}

export default App;
