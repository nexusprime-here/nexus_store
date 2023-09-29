import prisma from "@lib/database";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const query = searchParams.get("q");

	if (!query) {
		const allProducts = await prisma.product.findMany();
		return allProducts;
	} else {
		const filteredProducts = await prisma.product.findMany({
			where: {
				name: {
					contains: query,
					mode: "insensitive",
				},
			},
		});
		return filteredProducts;
	}
}
