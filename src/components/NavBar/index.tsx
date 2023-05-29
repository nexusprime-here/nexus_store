'use client';

import type React from "react";
import * as icons from 'react-icons/io5';
import S from "./styles.module.css";

const NavItem: React.FC<{ icon: keyof typeof icons, href: string, name: string }> = ({ icon, href, name }) => {
	const Icon = icons[icon];

	return (
		<li className={S.li}>
			<a href={href}>
				<Icon color="black" size={25} />
				<p style={{ color: "black", fontSize: 10 }}>{name}</p>
			</a>
		</li>
	)
}

const NavBar: React.FC = () => {
	return (
		<div className={S.container}>
			<ul className={S.ul}>
				<NavItem name="Início" href="/" icon="IoHomeOutline" />
				<NavItem name="Produtos" href="/products" icon="IoBagHandleOutline" />
				<NavItem name="Lovemail" href="/lovemail" icon="IoHeartOutline" />
			</ul>
		</div>
	);
};

export default NavBar;
