'use client'

import React from "react";
import Item from "./item";
import { AiOutlineLoading } from "react-icons/ai";
import fetchProducts from "./fetch";
import "./styles.css";
import { Product } from "@prisma/client";
import { cachedProducts, toSnakeCase } from "./CachedProducts";

function Loading() {
	return (
		<div className="w-full flex items-center justify-center">
			<AiOutlineLoading
				className="animate-spin"
				size={35}
			/>
		</div>
	)
}

const Separator: React.FC<{ name: string }> = ({ name }) => {
	return (
		<div className="separator">
			<div className="horizontal-line" />
			<p>{name}</p>
			<div className="horizontal-line" />
		</div>
	)
}

function Collection({ name, all }: { name: string, all?: boolean }) {
	const cached = cachedProducts.get(name).map(p => <Item data={p} key={p.id} />)

	const [loading, setLoading] = React.useState(cached.length < 1);
	const [items, setItems] = React.useState<React.JSX.Element[]>(cached);

	React.useEffect(() => {
		fetchProducts(all ? undefined : toSnakeCase(name)).then(products => {
			cachedProducts.set(name, products);
			setItems(products.map(p => <Item data={p} key={p.id} />));
			setLoading(false);
		})
	}, []);

	return !loading && items.length < 1
		? <></>
		: (
			<div className="flex-shrink-0 h-52">
				<Separator name={name} />

				<div className="row-overflow">
					{loading && <Loading />}
					{items}
				</div>
			</div>
		);
};

export default Collection;