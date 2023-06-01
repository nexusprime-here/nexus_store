import Link from 'next/link';
import * as icons from 'react-icons/io5';
import S from "./styles.module.css";

function NavItem({ icon, href, name }: { icon: keyof typeof icons, href: string, name: string }) {
	const Icon = icons[icon];

	return (
		<li className={S.li}>
			<Link prefetch href={href}>
				<Icon size={25} />
				<p>{name}</p>
			</Link>
		</li>
	)
}

export default NavItem;