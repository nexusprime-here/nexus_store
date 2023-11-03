import Search from "./search";
import Link from "next/link";
import { IoChatbubblesOutline } from "react-icons/io5";
import Nav from "./nav";

function Header() {
	const Contact = () => {
		return (
			<Link
				prefetch
				href="/contact"
				className="flex h-[45px] w-[45px] flex-col items-center justify-center rounded text-[--font-rgb]"
			>
				<IoChatbubblesOutline size={28} />
			</Link>
		);
	};

	return (
		<header className="fixed top-0 z-10 h-16 w-full bg-black">
			<div className="static flex h-16 flex-row items-center justify-evenly sm:hidden">
				<h2 className="font-['Poiret_One',cursive] text-[1.5rem] font-bold">
					Nexus Store
				</h2>

				<Search />
				<Contact />
			</div>
		</header>
	);
}

export default {
	Header,
	Nav,
};
