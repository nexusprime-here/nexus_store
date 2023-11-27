import Link from "next/link";
import Nav from "./nav";
import { IoBagOutline, IoSearchOutline } from "react-icons/io5";

function Header() {
	return (
		<header className="box hidden h-20 grid-cols-4 flex-row place-items-center items-center border-b-[1px] sm:grid">
			<Link href="/">
				<h1 className="font-poiret-one font-semibold">Nexus Store</h1>
			</Link>

			<Nav />

			<div className="flex items-center space-x-10 [&>*]:stroke-[rgba(255,255,255,.8)]">
				<IoSearchOutline size={22} />
				<IoBagOutline size={22} />
			</div>
		</header>
	);
}

export default {
	Header,
};
