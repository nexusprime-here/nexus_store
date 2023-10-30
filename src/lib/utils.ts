import { Collection, Product } from "@prisma/client";

export function toSnakeCase(input: string) {
	return input
		.replace(/([a-z])([A-Z])/g, '$1_$2')
		.replace(/\s+/g, '_')
		.toLowerCase();
}

export function filterByCollection(collectionId: string) {
	return (products: (Product & { collections: Collection[] })[]) => {
		return products.filter((p) =>
			p.collections.some((c) => c.id == collectionId)
		);
	};
}

export const hasAuthorization = (req: Request) =>
	req.headers.get("Authorization") === process.env["ADMIN_TOKEN"];
