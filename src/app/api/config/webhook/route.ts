import { configWebhook, detailWebhook } from "@lib/gn-sdk";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const { url } = await req.json();
	
	if(!url) {
		return NextResponse.json(null, { status: 400, statusText: "url on body requested" })
	}

	try {
		console.log(200)
		const result = await configWebhook(url);
		console.log(200)

		return NextResponse.json(result, { status: 200 });
	} catch(e: any) {
		return NextResponse.json(e, { status: 500, statusText: e?.message })
	}
}

export async function GET(req: Request) {
	const result = await detailWebhook();

	return NextResponse.json(result, { status: 200 });
}