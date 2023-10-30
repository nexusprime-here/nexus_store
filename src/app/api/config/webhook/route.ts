import { configWebhook } from "@lib/gn-sdk";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const { url } = await req.json();
	
	if(!url) {
		return NextResponse.json(null, { status: 400, statusText: "url on body requested" })
	}

	try {
		const result = await configWebhook(url);

		return NextResponse.json(result, { status: 200 });
	} catch(e: any) {
		return NextResponse.json(null, {status: 500, statusText: e?.message })
	}
}

