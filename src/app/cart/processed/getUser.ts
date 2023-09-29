"use server";

import { cookies as fetchCookies } from "next/headers";

async function getUser() {
	const cookies = fetchCookies();

	return cookies.get("user")?.value;
}

export default getUser;
