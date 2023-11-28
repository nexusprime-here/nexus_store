import prisma from '@lib/database';
import { NextResponse } from 'next/server';

// @ts-ignore
BigInt.prototype.toJSON = function() { return this.toString() };

export async function GET(req: Request) {
	const url = new URL(req.url);
	const { searchParams } = url;

	let result;

	if(searchParams.size > 0) {
		const txid = searchParams.get('txid');
		const status = searchParams.get('status');

		if(txid) {
			result = await prisma.order.findUnique({ 
				where: { txid },
				include: { products: true, user: true } 
			});
		}
		else if(status) {
			result = await prisma.order.findMany({ 
				where: { status: parseInt(status) },
				include: { products: true, user: true } 
			});
		}
	} else {
		result = await prisma.order.findMany({ include: { products: true, user: true } });
	}

	return NextResponse.json(result, { status:200 });
}