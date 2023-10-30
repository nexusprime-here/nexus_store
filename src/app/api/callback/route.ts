import { NextResponse } from "next/server";

export function POST(req: Request) {
	return NextResponse.json(null, { status: 200 });
}