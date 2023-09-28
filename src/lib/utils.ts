import { Collection, Product } from "@prisma/client";

export function toSnakeCase(inputString: string) {
	return inputString.replace(/([A-Z])/g, "_$1").toLowerCase();
}

export function filterByCollection(collectionId: string) {
	return (products: (Product & { collections: Collection[] })[]) => {
		return products.filter((p) =>
			p.collections.some((c) => c.id == collectionId)
		);
	};
}
