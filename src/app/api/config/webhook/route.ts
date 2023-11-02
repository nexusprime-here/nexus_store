import { configWebhook, detailWebhook } from "@lib/gn-sdk";
import { hasAuthorization } from '@lib/utils';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	if(!hasAuthorization(req)) return;
	
	const { url } = await req.json();
	
	if(!url) {
		return NextResponse.json(null, { status: 400, statusText: "url on body requested" })
	}

	try {
		const result = await configWebhook(url);

		return NextResponse.json(result, { status: 200 });
	} catch(e: any) {
		return NextResponse.json(e, { status: 500, statusText: e?.message })
	}
}

export async function GET(req: Request) {
	const result = await detailWebhook();

	return NextResponse.json(result, { status: 200 });
}