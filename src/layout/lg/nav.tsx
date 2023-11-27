import Link from "next/link";

const links = [
	{
		name: "Produtos",
		href: "/products",
	},
	{
		name: "Contato",
		href: "/contact",
	},
];

export default function Nav() {
	return (
		<nav className="col-span-2 flex w-1/3 justify-evenly underline-offset-2 [&>.active]:font-normal [&>a]:font-thin hover:[&>a]:underline">
			{links.map((l, i) => (
				<Link href={l.href} key={i}>
					{l.name}
				</Link>
			))}
		</nav>
	);
}
