import { OrderStatus } from "@lib/constants";
import prisma from "@lib/database";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const body = await req.json();

	await prisma.order.update({
		where: {
			transation_id: body.txid,
		},
		data: {
			status: OrderStatus.PAID,
		},
	});

	return NextResponse.json(null, {
		status: 200,
	});
}
