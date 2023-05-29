'use client';

import type React from "react";
import Link from 'next/link';
import * as icons from 'react-icons/io5';
import S from "./styles.module.css";

const NavItem: React.FC<{ icon: keyof typeof icons, href: string, name: string }> = ({ icon, href, name }) => {
	const Icon = icons[icon];

	return (
		<li className={S.li}>
			<Link href={href}>
				<Icon size={25} />
				<p>{name}</p>
			</Link>
		</li>
	)
}

const NavBar: React.FC = () => {
	return (
		<div className={S.container}>
			<ul className={S.ul}>
				<NavItem name="Início" href="/" icon="IoHomeOutline" />
				<NavItem name="Produtos" href="/products" icon="IoBagHandleOutline" />
				{/* <NavItem name="Lovemail" href="/lovemail" icon="IoHeartOutline" /> */}
			</ul>
		</div>
	);
};

export default NavBar;
