'use server';

import prisma from "@utils/prisma";

function fetchProducts(collection?: string) {
	return prisma.product.findMany(collection
		? {
			where: {
				collections: {
					has: collection
				}
			},
		}
		: undefined,
	)
}

export default fetchProducts