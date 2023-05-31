'use client';

import { useRouter } from "next/navigation";

export default function ReloadServer() {
	location.href = "/"

	const router = useRouter();
	router.refresh()
}