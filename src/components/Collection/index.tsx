"use client";

import "./styles.css";
import React from "react";
import Item from "./item";
import { AiOutlineLoading } from "react-icons/ai";
import { cachedProducts } from "./CachedProducts";
import { Product } from "@prisma/client";
import { filterByCollection } from "@lib/utils";

function Loading() {
	return (
		<div className="flex w-full items-center justify-center">
			<AiOutlineLoading className="animate-spin" size={35} />
		</div>
	);
}

const Separator: React.FC<{ name: string }> = ({ name }) => {
	return (
		<div className="separator">
			<div className="horizontal-line" />
			<p>{name}</p>
			<div className="horizontal-line" />
		</div>
	);
};

function Collection({
	name,
	all,
}: {
	name: string;
	all?: boolean;
	prefetch?: Product[];
}) {
	const { signal } = new AbortController();

	const [loading, setLoading] = React.useState(true);
	const [items, setItems] = React.useState<React.JSX.Element[]>([]);

	React.useEffect(() => {
		fetch("/api/products?include=collections", {
			cache: "force-cache",
			signal,
			next: { tags: ["collection"] },
		})
			.then((res) => res.json())
			.then(filterByCollection(name))
			.then((products: Array<Product>) => {
				console.log({ products });
				cachedProducts.set(name, products);
				setItems(products.map((p) => <Item data={p} key={p.id} />));
				setLoading(false);
			});
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
