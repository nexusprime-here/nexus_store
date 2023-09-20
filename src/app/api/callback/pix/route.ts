import { OrderStatus } from "@utils/enums";
import prisma from "@lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	console.log('REQUEST')
	const body = await req.json();

	await prisma.order.update({
		where: {
			transation_id: body.txid
		},
		data: {
			status: OrderStatus.PAID
		}
	});

	return NextResponse.json(null, {
		status: 200
	})
}