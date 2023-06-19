export default <NavLinkObj[]>[
	{
		name: 'Início',
		href: "/",
		icon: "IoHomeOutline",
		onlyMobile: true
	},
	{
		name: "Buscar",
		href: '#search',
		icon: "IoSearchOutline",
		onlyMobile: true
	},
	{
		name: "Produtos",
		href: '/products',
		icon: "IoBagHandleOutline"
	},
	{
		name: "Rastrear",
		href: '/track',
		icon: "IoMapOutline"
	},
	{
		name: "Fale Conosco",
		href: '/contact',
		icon: "IoChatbubblesOutline",
		separatedOnMobile: true
	}
]

interface NavLinkObj {
	name: string,
	href: string,
	icon: keyof typeof import('react-icons/io5'),
	separatedOnMobile?: boolean,
	onlyMobile?: boolean
}