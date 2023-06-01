import type React from "react";
import S from "./styles.module.css";
import NavItem from "./NavItem";

function NavBar() {
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
