import Collection from "@components/Collection";
import prisma from "@utils/prisma";
import { headers } from "next/dist/client/components/headers";
import Link from "next/link";
import { AiOutlineInstagram as InstagramIcon } from 'react-icons/ai'

async function fetchProducts() {
	return await prisma.product.findMany({
		where: {
			collection: "mais_vendidos",
		},
	});
}

export default async function Home() {
	headers();

	const products = await fetchProducts();

	return (
		<>
			<div className="mx-10 mb-10 mt-5">
				<p>Bem vindo ao Nexus Store!</p>
				<p>Entregamos doces, salgados e materiais escolares no colégio em horário de aula ou de intervalo.</p>
				<br />
				<p>Você pode entrar em contato conosco clicando no ícone de chat no canto superior direito!</p>
			</div>
			
			<Collection name="Mais Vendidos" items={products} />

			<Link 
				className="mx-10 mt-8 flex items-center justify-center" 
				href={'https://www.instagram.com/nexusprime_here/'}
			>
				<InstagramIcon size={30}/>
				<p className="text-lg ml-1 font-light underline">nexusprime_here</p>
			</Link>
		</>
	);
}
