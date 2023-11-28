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

			<div className="h-screen flex-col items-center pb-24 pt-[4.5rem] lg:px-20 lg:pb-0 lg:pt-4">
				{children}
			</div>

			<sm.Nav />
		</>
	);
}

export default Layout;
