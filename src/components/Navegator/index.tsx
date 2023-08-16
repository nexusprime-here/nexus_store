import type React from "react";
import Link from "next/link";
import * as Icons from 'react-icons/io5';

import navLinks from './links';
import SearchInput from "./SearchInput";

function Navegator() {
	const desktopNavLinks = navLinks.filter(n => n.platform !== 'mobile').map(n => {
		return (
			<Link
				prefetch
				className='h-[45px] flex flex-col items-center justify-center rounded'
				href={n.href}
				key={n.href}
			>
				<h3>{n.name}</h3>
			</Link>
		)
	});

	const mobileBottomBarLinks = navLinks.filter(n => n.platform !== 'desktop' && n.location == 'bottom').map(n => {
		const Icon = Icons[n.icon];

		return (
			<Link
				prefetch
				className='flex flex-col items-center justify-center rounded h-[45px] w-[45px]'
				href={n.href}
				key={n.href}
			>
				<Icon size={25} />
				<p className="text-current text-[10px] font-extralight">{n.name}</p>
			</Link>
		)
	});
	const mobileHeaderLinks = navLinks.filter(n => n.platform !== 'desktop' && n.location == 'header').map(n => {
		const Icon = Icons[n.icon];

		return (
			<Link
				prefetch
				className='flex flex-col items-center justify-center rounded h-[45px] w-[45px]'
				href={n.href}
				key={n.href}
			>
				<Icon size={25} />
				<p className="text-current text-[7px] font-extralight">{n.name}</p>
			</Link>
		)
	});

	return (
		<>
			<div className="fixed bottom-0 left-0 w-full sm:relative">
				{/* For Desktops */}
				<div className='box h-20 border-b-[1px] hidden sm:flex flex-row justify-around items-center'>
					<div className='w-1/3 flex justify-evenly'>
						{desktopNavLinks}
					</div>

					<SearchInput />
				</div>

				{/* For Mobile */}
				<div className='box h-14 border-[1px] m-3.5 py-[5px] rounded-xl sm:hidden flex flex-row justify-around'>
					{mobileBottomBarLinks}
				</div>
			</div>

			<div className="sm:hidden h-16 flex flex-row items-center justify-evenly ">
				<SearchInput mobile />

				<p>Nexus Store</p>
				{mobileHeaderLinks}
			</div>
		</>
	);
};

export default Navegator;
