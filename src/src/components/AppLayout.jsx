import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const AppLayout = () => {
	return (
		<div className="bg-slate-50 h-screen">
			<Header />
			<Outlet />
		</div>
	);
};

export default AppLayout;
