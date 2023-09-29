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
	const MobileNav = () => {
		return (
			<>
				<sm.Nav />
			</>
		);
	};

	return (
		<>
			<Header />

			<div className="mt-16 h-[110vh] flex-col items-center">{children}</div>

			<MobileNav />
		</>
	);
}

export default Layout;
