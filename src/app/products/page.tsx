import Collection from "@components/Collection";
import prisma from "@utils/prisma";

export default async function Produtos() {
	const mostSelled = await prisma.product.findMany({
		where: {
			collection: "mais_vendidos",
		},
	});

	const news = await prisma.product.findMany({
		where: {
			collection: "novos",
		},
	});

	const all = await prisma.product.findMany();

	return (
		<>
			<h2>Produtos</h2>
			<div style={{ paddingBottom: 30 }}>
				<Collection name="Mais Vendidos" items={mostSelled} />
				<Collection name="Novos" items={news} />
				<Collection name="Todos" items={all} />
			</div>
		</>
	)
}