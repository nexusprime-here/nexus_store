export default <NavLinkObj[]>[
	{
		name: 'Início',
		href: "/",
		icon: "IoHomeOutline",
		platform: 'mobile',
		location: 'bottom'
	},
	{
		name: "Buscar",
		href: '/',
		icon: "IoSearchOutline",
		platform: 'mobile',
		location: 'header'
	},
	{
		name: "Produtos",
		href: '/products',
		icon: "IoBagHandleOutline",
		location: 'bottom'
	},
	{
		name: "Fale Conosco",
		href: '/contact',
		icon: "IoChatbubblesOutline",
		location: 'header'
	}
]

type NavLinkObj =
	| {
		name: string,
		href: string,
		icon: keyof typeof import('react-icons/io5'),
		platform?: 'desktop',
		location: never
	}
	| {
		name: string,
		href: string,
		icon: keyof typeof import('react-icons/io5'),
		platform?: 'mobile' | 'all',
		location: 'header' | 'bottom'
	}