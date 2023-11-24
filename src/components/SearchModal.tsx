"use client";

import { Product } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import Loading from "./Loading";
import Image from "next/image";
import Link from "next/link";

const cache: { [k: string]: Product[] } = {};
let searchTimeout: NodeJS.Timeout | null = null;

async function searchApiWithLocalCache(searchParams: string) {
	const register = async () => {
		const result = await fetch(`/api/search?${searchParams}`).then(
			(r) => r.json() as Promise<Product[]>,
		);

		Object.assign(cache, { [searchParams]: result });

		return result;
	};

	return cache[searchParams] ?? (await register());
}

function Search({
	active,
	onChange,
}: {
	active: boolean;
	onChange: () => void;
}) {
	const [query, setQuery] = useState("");
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<Product[]>([]);

	useEffect(() => {
		const makeSearch = async () => {
			if (query.length < 1) {
				return;
			}

			setLoading(true);
			const params = new URLSearchParams();
			params.set("q", query?.toLowerCase().replace(/\s+/g, " ").trim());

			try {
				const result = await searchApiWithLocalCache(params.toString());

				setLoading(false);
				setResult(result);
			} catch {}
		};

		if (searchTimeout) {
			clearTimeout(searchTimeout);
		}
		searchTimeout = setTimeout(makeSearch, 700);

		return () => {
			if (searchTimeout) {
				clearTimeout(searchTimeout);
				setLoading(false);
			}
		};
	}, [query]);

	return (
		<div
			data-open={active}
			className="fixed inset-0 left-0 top-0 z-20 hidden h-screen w-screen flex-col items-center bg-[rgba(0,0,0,0.5)] backdrop-blur-md data-[open=true]:flex"
			onClick={onChange}
		>
			<div className="h-full w-full">
				<IoCloseOutline size={25} className="absolute right-2 top-2" />

				<main className="h-full w-full">
					<div
						className="relative mx-14 mb-10 mt-14"
						onClick={(e) => e.stopPropagation()}
					>
						<IoSearchOutline
							size={24}
							className="absolute left-3 top-1/2 -translate-y-1/2"
						/>
						<input
							type="text"
							className="h-12 rounded-md border-b-2 border-solid border-white bg-transparent pl-12 text-lg placeholder:font-light"
							value={query}
							placeholder="Digite um produto"
							onChange={(e) => setQuery(e.target.value)}
						/>
					</div>

					<div className="mx-6 flex h-full flex-col">
						{loading ? (
							<div className="h-1/2">
								<Loading size={45} />
							</div>
						) : (
							result.map((i) => (
								<Link
									href={`/products/${i.id}`}
									className="flex h-24 w-full items-center rounded-lg border-white p-2"
									key={i.id}
									onClick={(e) => (e.stopPropagation(), onChange())}
								>
									<div className="relative h-16 w-16">
										<Image
											src={`data:image/jpeg;base64,${i.icon}`}
											alt={i.name}
											fill
											className="absolute left-0 top-0 h-auto w-full rounded object-cover"
										/>
									</div>

									<div className="overflow-hiddenoverflow-hidden ml-5 flex flex-col">
										<h3 className="font-semibold">{i.name}</h3>
									</div>
								</Link>
							))
						)}
					</div>
				</main>
			</div>
		</div>
	);
}

export default Search;
