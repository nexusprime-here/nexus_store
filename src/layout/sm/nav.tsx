"use client";

import TouchableIcon, { CleanIconsType } from "@components/TouchableIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = new Array<{ name: string; href: string; icon: CleanIconsType }>(
	{
		name: "Início",
		href: "/",
		icon: "Home",
	},
	{
		name: "Produtos",
		href: "/products",
		icon: "BagHandle",
	},
	{
		name: "Carrinho",
		href: "/cart",
		icon: "Cart",
	},
);

export default function Nav() {
	const pathname = usePathname();

	return (
		<div className="fixed bottom-0 left-0 w-full sm:relative">
			<nav className="box m-3.5 flex h-14 flex-row justify-around rounded-xl border-[1px] py-[5px] sm:hidden">
				{links.map((l) => {
					const isActive =
						l.href.length != 1
							? pathname.startsWith(l.href)
							: pathname == l.href;

					return (
						<Link
							prefetch
							href={l.href}
							key={l.href}
							data-active={isActive}
							className="flex h-[45px] w-[45px] flex-col items-center justify-center rounded text-primary data-[active=false]:text-secoundary"
						>
							<TouchableIcon size={25} type={l.icon as any} active={isActive} />
							<p className="text-current text-[10px] font-extralight">
								{l.name}
							</p>
						</Link>
					);
				})}
			</nav>
		</div>
	);
}
