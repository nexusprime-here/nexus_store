'use server';

import prisma from "@utils/prisma";

function fetchProducts(collection?: string) {
	return prisma.product.findMany(collection
		? {
			where: {
				collections: {
					some: { name: collection }
				}
			},
		}
		: undefined,
	)
}

export default fetchProducts