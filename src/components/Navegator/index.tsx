import type React from "react";
import Link from "next/link";

import * as Icons from 'react-icons/io5';
import Search from '@components/Search';

type NavLinkObj = { name: string, href: string, icon: keyof typeof Icons, separatedOnMobile?: boolean }

function Navegator() {
	const navLinks: NavLinkObj[] = [
		{ name: 'Início', href: "/", icon: "IoHomeOutline" },
		{ name: "Buscar", href: '#search', icon: "IoSearchOutline" },
		{ name: "Produtos", href: '/products', icon: "IoBagHandleOutline" },
		{ name: "Rastrear", href: '/track', icon: "IoMapOutline" },
		{ name: "Fale Conosco", href: '/products', icon: "IoChatbubblesOutline", separatedOnMobile: true }
	]

	return (
		<div className="fixed bottom-0 left-0 w-full md:relative text-black">
			{/* For Desktops */}
			<div className={`
				hidden md:flex h-16
				bg-[rgb(var(--foreground-rgb))] list-none
				flex-row justify-around items-center
			`}>
				{navLinks.map(n => {
					return (
						<Link
							prefetch
							className='h-[45px] w-[45px] flex flex-col items-center justify-center rounded'
							href={n.href}
							key={n.href}
						>
							<h3>{n.name}</h3>
						</Link>
					)
				})}

				<Search />
			</div>

			{/* Mobile Only */}
			<div className={`
				md:hidden h-14
				bg-[rgb(var(--foreground-rgb))] list-none
				m-3.5 py-[5px] rounded-xl
				flex flex-row justify-around
			`}>
				{navLinks.filter(n => !n.separatedOnMobile).map(n => {
					const Icon = Icons[n.icon];

					return (
						<Link prefetch className={`
							flex flex-col items-center justify-center
							rounded h-[45px] w-[45px]
						`} href={n.href} key={n.href}>
							<Icon className="absolute bottom-8" size={28} />
							<p className="text-current text-[10px] absolute bottom-4">{n.name}</p>
						</Link>
					)
				})}
			</div>
		</div>
	);
};

export default Navegator;
