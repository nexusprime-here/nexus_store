'use server';

import prisma from "@lib/prisma";

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