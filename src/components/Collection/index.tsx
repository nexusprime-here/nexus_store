"use client";

import "./styles.css";
import React from "react";
import Item from "./item";
import { Product } from "@prisma/client";
import { filterByCollection, toSnakeCase } from "@lib/utils";
import Loading from "@components/Loading";

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

	const [loading, setLoading] = React.useState(false);
	const [items, setItems] = React.useState<React.JSX.Element[]>([]);

	React.useEffect(() => {
		(async () => {
			const showLoading = setTimeout(() => setLoading(true), 500);

			try {
				const products = await fetch("/api/products?include=collections", {
					signal,
					next: { tags: ["collection"] },
				})
					.then((res) => res.json())
					.then(all ? null : filterByCollection(toSnakeCase(name)));

				setItems(products.map((p) => <Item data={p} key={p.id} />));

				clearTimeout(showLoading);
				setLoading(false);
			} catch {
				clearTimeout(showLoading);
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
