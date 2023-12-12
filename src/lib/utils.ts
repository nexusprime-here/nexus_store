import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Collection, Product } from "@prisma/client";
import axios from "axios";
import { PaymentMethods, WEBHOOK_URL } from "./constants";
import { CartItem } from "@app/cart/hook";

export function toSnakeCase(input: string) {
	return input
		.replace(/([a-z])([A-Z])/g, "$1_$2")
		.replace(/\s+/g, "_")
		.toLowerCase();
}

export function filterByCollection(collectionId: string) {
	return (products: (Product & { collections: Collection[] })[] | null) => {
		return products?.filter((p) => p.collections.some((c) => c.id == collectionId));
	};
}

export const hasAuthorization = (req: Request) => req.headers.get("Authorization") === process.env["ADMIN_TOKEN"];

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const Webhook = {
	sendOrder(payment: PaymentMethods, obj: { [k: string]: any }) {
		const embed = {
			title: "Compra Realizada",
			description: `O autor da compra "${obj.name}", portador do CPF ${obj.CPF} que reside no CEP ${obj.CEP} nº ${obj.nResidencia} com o complemento "${obj.complemento}" comprou:`,
			fields: new Array(),
			color: 0x00ff00,
		};

		if (payment == PaymentMethods.PIX) {
			embed.fields = obj.products.map((p) => ({
				name: p.name,
				value: `${JSON.parse(obj.quantity)[p.id]} unidades`,
			}));
		} else {
			embed.fields = (obj.products as CartItem[]).map((p) => ({ name: p.product.name, value: `${p.quantity} unidades` }));
		}

		axios.post(WEBHOOK_URL, { embeds: [embed] });
	},
};
