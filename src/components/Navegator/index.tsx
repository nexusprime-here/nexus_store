import type React from "react";
import Link from "next/link";
import * as Icons from 'react-icons/io5';
import Search from '@components/Search';

import navLinks from './links';

function Navegator() {
	return (
		<div className="fixed bottom-0 left-0 w-full sm:relative text-black">
			{/* For Desktops */}
			<div className={`
				list-none h-16 bg-[rgb(var(--foreground-rgb))]
				hidden sm:flex flex-row justify-around items-center
			`}>
				{navLinks.filter(n => !n.onlyMobile).map(n => {
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

			{/* For Mobile */}
			<div className={`
				list-none bg-[rgb(var(--foreground-rgb))]
				h-14 m-3.5 py-[5px] rounded-xl
				sm:hidden flex flex-row justify-around
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
