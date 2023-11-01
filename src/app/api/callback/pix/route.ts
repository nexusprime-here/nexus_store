import { OrderStatus } from "@lib/constants";
import prisma from "@lib/database";
import axios from "axios";
import { NextResponse } from "next/server";

const WEBHOOK_URL = "https://discord.com/api/webhooks/1154280449544310924/nCaPFI8OYVEYXNYYlqd8grkdk9J5BnwLAdgC7ZU7zcQFBf1IWIBZ1ugLl_MfmSrNtahp";

export async function POST(req: Request) {
	const body = await req.json();
	console.log('Request [CALLBACK/PIX]: ', body)

	if(!('txid' in body)) {
		return NextResponse.json(null, { status: 400 });
	}

	const order = await prisma.order.update({
		where: {
			transation_id: body.txid,
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
		user: {name, ano, sala, fund},
		products,
		p_quantity
	} = order

	const embed = {
		title: "Compra Realizada",
		author: { name },
		footer: { text: `${ano}º ano ${sala}, fund ${fund}` },
		fields: products.map(p => ({
			name: p.name,
			value: `${JSON.parse(p_quantity)[p.id]} unidades` 
		})),
		color: 0x00FF00
	}

	axios.post(WEBHOOK_URL, { embeds: [embed] });

	return NextResponse.json(null, {
		status: 200,
	});
}