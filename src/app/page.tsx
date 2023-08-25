import Collection from "@components/Collection";
import prisma from "@utils/prisma";
import { headers } from "next/dist/client/components/headers";

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
			<div className="mx-10 mb-10">
				<p>Teste</p>
				<p>Teste</p>
				<p>Teste</p>
				<p>Teste</p>
				<p>Teste</p>
			</div>
			
			<Collection name="Mais Vendidos" items={products} />
		</>
	);
}
