import React from "react";
import type { Product } from "@prisma/client";
import Item from "./item";
import "./styles.css";

const Separator: React.FC<{ name: string }> = ({ name }) => {
	return (
		<div className="separator">
			<div className="horizontal-line" />
			<p>{name}</p>
			<div className="horizontal-line" />
		</div>
	)
}

function Collection({ name, items }: { name: string, items: Product[] }) {
	const mappedItems = items.map((i) => <Item key={i.id} data={i} />);

	return mappedItems.length > 0
		? (
			<div style={{ flexShrink: 0 }}>
				<Separator name={name} />
				<div className="row-overflow">
					{mappedItems}
				</div>
			</div>
		)
		: <></>;
};

export default Collection;