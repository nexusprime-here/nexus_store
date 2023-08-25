import Link from 'next/link';
import * as Icons from 'react-icons/io5';

const links = [
	{
		name: 'Início',
		href: "/",
		icon: "IoHomeOutline",
		platform: 'mobile',
		location: 'bottom'
	},
	{
		name: "Buscar",
		href: '/fetch',
		icon: "IoSearchOutline",
		platform: 'mobile',
		location: 'header'
	},
	{
		name: "Produtos",
		href: '/products',
		icon: "IoBagHandleOutline",
		platform: 'all',
		location: 'bottom'
	},
	{
		name: "Carrinho",
		href: "/cart",
		icon: "IoCartOutline",
		platform: "all",
		location: "bottom"
	},
	{
		name: "Fale Conosco",
		href: '/contact',
		icon: "IoChatbubblesOutline",
		platform: 'all',
		location: 'header'
	}
];

export const mobile = {
	header: links
		.filter(l => l.platform != 'desktop' && l.location == 'header')
		.map(n => {
			const Icon = Icons[n.icon as keyof typeof Icons];
		
			return (
				<Link prefetch href={n.href} key={n.href}
					className='flex flex-col items-center justify-center rounded h-[50px] w-[50px]'
				>
					<Icon size={28} />
				</Link>
			)
		}),
	bottom: links
		.filter(l => l.platform != 'desktop' && l.location == 'bottom')
		.map(n => {
			const Icon = Icons[n.icon as keyof typeof Icons];

			return (
				<Link prefetch href={n.href} key={n.href}
					className='flex flex-col items-center justify-center rounded h-[45px] w-[45px] text-[--font-rgb]'
				>
					<Icon size={25} />
					<p className="text-current text-[10px] font-extralight">{n.name}</p>
				</Link>
			)
		})
}

export const desktop = links
	.filter(l => l.platform != 'mobile')
	.map(n => {
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