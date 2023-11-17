import { OrderStatus, PaymentMethods } from "@lib/constants";
import prisma from "@lib/database";
import { Webhook } from "@lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const body = await req.json();

	for(const p of body.pix) {
		const order = await prisma.order.update({
			where: {
				transation_id: p.txid,
			},
			data: {
				status: OrderStatus.PAID,
			},
			include: {
				user: true,
				products: true
			}
		});
	
		const { 
			user: {name, ano, sala},
			products,
			p_quantity: quantity
		} = order
	
		Webhook.sendOrder(PaymentMethods.PIX, { ano, quantity, products, sala, name });
	}

	return NextResponse.json(null, {
		status: 200,
	});
}