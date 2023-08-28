import { Product } from "@prisma/client";

export const cachedProducts = {
	get(name: string): Product[] {
		const collection = globalThis?.localStorage?.getItem(`collection:${toSnakeCase(name)}`);

		return collection ? JSON.parse(collection) : [];
	},
	set(name: string, products: Product[]) {
		localStorage.setItem(`collection:${toSnakeCase(name)}`, JSON.stringify(products));
	}
}

export function toSnakeCase(inputText: string) {
	return inputText
		.replace(/\s+/g, '_')
		.replace(/([a-z])([A-Z])/g, '$1_$2')
		.toLowerCase();
}
