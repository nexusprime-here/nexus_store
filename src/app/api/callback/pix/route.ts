import { OrderStatus, PaymentMethods } from "@lib/constants";
import prisma from "@lib/database";
import { Webhook } from "@lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const body = await req.json();

	for (const p of body.pix) {
		const order = await prisma.order.update({
			where: {
				txid: p.txid,
			},
			data: {
				status: OrderStatus.PAID,
			},
			include: {
				user: true,
				products: true,
			},
		});

		const {
			user: { name, CEP, CPF, complemento, nResidencia },
			products,
			p_quantity: quantity,
		} = order;

		Webhook.sendOrder(PaymentMethods.PIX, { CEP, quantity, products, complemento, CPF, nResidencia, name });
	}

	return NextResponse.json(null, {
		status: 200,
	});
}
