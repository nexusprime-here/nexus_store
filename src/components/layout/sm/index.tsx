import Search from "./search";
import Link from "next/link";
import { IoChatbubblesOutline } from "react-icons/io5";
import * as Icons from "react-icons/io5";

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

export function Nav() {
	const links = [
		{
			name: "Início",
			href: "/",
			icon: "IoHomeOutline",
		},
		{
			name: "Produtos",
			href: "/products",
			icon: "IoBagHandleOutline",
		},
		{
			name: "Carrinho",
			href: "/cart",
			icon: "IoCartOutline",
		},
	];

	return (
		<div className="fixed bottom-0 left-0 w-full sm:relative">
			<nav className="box m-3.5 flex h-14 flex-row justify-around rounded-xl border-[1px] py-[5px] sm:hidden">
				{links.map((l) => {
					const Icon = Icons[l.icon as keyof typeof Icons];

					return (
						<Link
							prefetch
							href={l.href}
							key={l.href}
							className="flex h-[45px] w-[45px] flex-col items-center justify-center rounded text-[--font-rgb]"
						>
							<Icon size={25} />
							<p className="text-[10px] font-extralight text-current">
								{l.name}
							</p>
						</Link>
					);
				})}
			</nav>
		</div>
	);
}

export default {
	Header,
	Nav,
};
