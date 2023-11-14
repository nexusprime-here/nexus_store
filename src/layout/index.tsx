import React from "react";
import lg from "./lg";
import sm from "./sm";

function Layout({ children }: { children: React.ReactNode }) {
	const Header = () => {
		return (
			<>
				<lg.Header />
				<sm.Header />
			</>
		);
	};

	/**
	 * A navegação de telas de desktop estão implementadas dentro do Header
	 */

	return (
		<>
			<Header />

			<div className="pt-[4.5rem] pb-24 min-h-screen flex-col items-center">
				{children}
			</div>

			<sm.Nav />
		</>
	);
}

export default Layout;
