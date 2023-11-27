"use client";

import Link from "next/link";
import { IoLogoWhatsapp } from "react-icons/io5";
import Search from "./search";
import { useEffect, useState } from "react";

function Header() {
	const [opacity, setOpacity] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			setOpacity(window.scrollY);
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const Contact = () => (
		<Link
			prefetch
			href="/contact"
			className="flex h-[45px] w-[45px] flex-col items-center justify-center rounded text-[--font-rgb]"
		>
			<IoLogoWhatsapp size={28} />
		</Link>
	);

	return (
		<header
			className={`fixed top-0 z-10 h-16 w-full sm:hidden`}
			style={{
				background: `rgba(0,0,0,${opacity / 100})`,
			}}
		>
			<div className="static flex h-16 flex-row items-center justify-evenly sm:hidden">
				<h2 className="font-poiret-one text-[1.5rem] font-semibold">
					Nexus Store
				</h2>

				<Search />
				<Contact />
			</div>
		</header>
	);
}

export default Header;
