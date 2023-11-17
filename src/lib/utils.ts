import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Collection, Product } from "@prisma/client";
import axios from "axios";
import { PaymentMethods } from './constants';
import { CartItem } from "@app/cart/hook";

export function toSnakeCase(input: string) {
	return input
		.replace(/([a-z])([A-Z])/g, '$1_$2')
		.replace(/\s+/g, '_')
		.toLowerCase();
}

export function filterByCollection(collectionId: string) {
	return (products: (Product & { collections: Collection[] })[] | null) => {
		return products?.filter((p) =>
			p.collections.some((c) => c.id == collectionId)
		);
	};
}

export const hasAuthorization = (req: Request) =>
	req.headers.get("Authorization") === process.env["ADMIN_TOKEN"];

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

const WEBHOOK_URL = "https://discord.com/api/webhooks/1154280449544310924/nCaPFI8OYVEYXNYYlqd8grkdk9J5BnwLAdgC7ZU7zcQFBf1IWIBZ1ugLl_MfmSrNtahp";
export const Webhook = {
	sendOrder(payment: PaymentMethods, obj: { [k: string]: any }) {
		const embed = {
			title: "Compra Realizada",
			author: { name },
			footer: { text: `${obj.ano}º ano ${obj.sala}` },
			fields: new Array(),
			color: 0x00FF00
		}

		if(payment == PaymentMethods.PIX) {
			embed.fields = obj.products.map(p => ({
				name: p.name,
				value: `${JSON.parse(obj.quantity)[p.id]} unidades` 
			}));
		} else {
			embed.fields = (obj.products as CartItem[]).map(p => ({ name: p.product.name, value: `${p.quantity} unidades` }));
		}

		axios.post(WEBHOOK_URL, { embeds: [embed] });
	}
}