import { NextResponse } from "next/server";

export function GET(req: Request) {
	return NextResponse.redirect('https://wa.me/5511965733543');
}