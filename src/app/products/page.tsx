import Collection from "@components/Collection";
import prisma from "@utils/prisma";
import { headers } from "next/headers";

async function fetchProducts() {
	const mostSelled = prisma.product.findMany({
		where: {
			collection: "mais_vendidos",
		},
	});

	const news = prisma.product.findMany({
		where: {
			collection: "novos",
		},
	});

	const all = prisma.product.findMany();

	const promises = await Promise.all([mostSelled, news, all]);

	return {
		mostSelled: promises[0],
		news: promises[1],
		all: promises[2]
	}
}

export default async function Produtos() {
	headers();

	const { mostSelled, news, all } = await fetchProducts();

	return (
		<div className="pb-4 space-y-8">
			<Collection name="Mais Vendidos" items={mostSelled} />
			<Collection name="Novos" items={news} />
			<Collection name="Todos" items={all} />
		</div>
	)
}