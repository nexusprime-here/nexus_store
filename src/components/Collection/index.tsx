"use client";

import React from "react";
import { Item, SkeletonItem } from "./item";
import type { Collection, Product } from "@prisma/client";
import { filterByCollection, toSnakeCase } from "@lib/utils";
import { RevalidationTags } from "@lib/constants";

const Separator: React.FC<{ name: string }> = ({ name }) => {
	return (
	  <div className="flex flex-row items-center text-[rgba(var(--font-rgb),0.5)] justify-center px-8">
		<div className="border border-[rgba(var(--font-rgb),0.5)] h-0 flex-grow" />
		<p className="whitespace-nowrap px-1 text-[.6rem] text-gray-500">{name}</p>
		<div className="border border-[rgba(var(--font-rgb),0.5)] h-0 flex-grow" />
	  </div>
	);
  };

async function sessionCachedFetch({ signal, lazyload }: { signal: AbortSignal, lazyload }) {
	let result: (Product & { collections: Collection[] })[] | null = null;

	const fetchProduct = async () => {
		const request = await fetch("/api/products?include=collections", {
			signal,
			next: { tags: [RevalidationTags.TO_COLLECTIONS] },
		});

		const result = await request.json();

		sessionStorage.setItem('products', JSON.stringify(result));

		return result;
	}

	if('sessionStorage' in globalThis) {
		const productInStr = sessionStorage.getItem('products');

		if(productInStr) {
			result = JSON.parse(productInStr);
		}

		fetchProduct().then(lazyload);
	}

	if(!result) {
		result = await fetchProduct();
	}

	return result;
}

function Collection({
	name,
	all,
}: {
	name: string;
	all?: boolean;
}) {
	const { signal } = new AbortController();
	
	const [loading, setLoading] = React.useState(true);
	const [items, _setItems] = React.useState<React.JSX.Element[]>([]);

	const setItems = (products) => {
		_setItems(
			products.map((p) => (
				<Item data={p} key={p.id} />
			))
		)
	}

	const lazyload = (data) => {
		setItems(all ? data : filterByCollection(toSnakeCase(name))(data));
	}
	
	React.useEffect(() => {
		(async () => {

			try {
				const products = await sessionCachedFetch({ signal, lazyload })
					.then(all ? null : filterByCollection(toSnakeCase(name)));

				setItems(products);

				setLoading(false);
			} catch(e) {
				setLoading(false);
			}
		})();
	}, [all, name]);

	return !loading && items.length < 1
		? <></>
		: (
			<div className="flex-shrink-0">
				<Separator name={name} />

				<div 
					className="flex flex-row overflow-x-auto mx-8 py-[10px] [&::-webkit-scrollbar]:hidden"
				>{ loading 
						? <>
							<SkeletonItem />
							<SkeletonItem />
							<SkeletonItem />
						</>
						: items
					}</div>
				</div>
		)
}

function Loading() {
	return <>
	</>
}

export default Collection;