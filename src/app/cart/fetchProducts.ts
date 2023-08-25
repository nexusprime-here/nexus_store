'use server';

import prisma from "@root/utils/prisma";

function fetchProductsById(ids: number[]) {
	return prisma.product.findMany({
		where: { id: { in: ids } },
	})
}

export default fetchProductsById;