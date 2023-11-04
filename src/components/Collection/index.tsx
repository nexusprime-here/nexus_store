"use client";

import "./styles.css";
import React from "react";
import Item from "./item";
import { Collection, Product } from "@prisma/client";
import { filterByCollection, toSnakeCase } from "@lib/utils";
import Loading from "@components/Loading";
import { RevalidationTags } from "@lib/constants";

const Separator: React.FC<{ name: string }> = ({ name }) => {
	return (
		<div className="separator">
			<div className="horizontal-line" />
			<p>{name}</p>
			<div className="horizontal-line" />
		</div>
	);
};

async function sessionCachedFetch({ signal, lazyload }: { signal: AbortSignal, lazyload }) {
	let result: (Product & { collections: Collection[] })[] | null = null;

	const fetchProduct = async () => {
		const request = await fetch("/api/products?include=collections", {
			signal,
			next: { tags: [RevalidationTags.ProductsWithCollection] },
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
	prefetch?: Product[];
}) {
	const { signal } = new AbortController();
	
	const [loading, setLoading] = React.useState(false);
	const [items, _setItems] = React.useState<React.JSX.Element[]>([]);

	const setItems = (products) => {
		_setItems(
			products.map((p) => (
				<Item data={p} key={p.id} />
			))
		)
	}

	const lazyload = (data) => {
		setItems(data);
	}
	
	React.useEffect(() => {
		(async () => {
			setLoading(true);

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

	return !loading && items.length < 1 ? (
		<></>
	) : (
		<div className="h-52 flex-shrink-0">
			<Separator name={name} />

			<div className="row-overflow">{loading ? <Loading /> : items}</div>
		</div>
	);
}

export default Collection;