"use client";

import { Product } from "@prisma/client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CommandDialog, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/Command";

const cache: { [k: string]: Product[] } = {};
let searchTimeout: NodeJS.Timeout | null = null;

async function searchApiWithLocalCache(searchParams: string) {
	const register = async () => {
		const result = await fetch(`/api/search?${searchParams}`).then(
			(r) => r.json() as Promise<Product[]>
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
	onChange: (open: boolean) => void;
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
			params.set("q", query?.toLowerCase().trim());

			try {
				const result = await searchApiWithLocalCache(params.toString());

				setLoading(false);
				console.log({result})

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
		<CommandDialog open={active} onOpenChange={onChange}>
			<CommandInput placeholder="Digite um produto" onValueChange={(q) => setQuery(q)} value={query}/>
			<CommandList>
				{ loading
					? 'Carregando'
					: result.map((p, i) => (
						<CommandItem key={i} className="flex">
							<div className="relative h-16 w-16 m-2 mr-5">
								<Image
									src={`data:image/jpeg;base64,${p.icon}`}
									alt={p.name}
									fill
									className="absolute left-0 top-0 h-auto w-full rounded object-cover"
								/>
							</div>
							<h3 className="font-semibold">{p.name}</h3>
						</CommandItem>
					))
				}				
			</CommandList>
		</CommandDialog>
	);
}

export default Search;
