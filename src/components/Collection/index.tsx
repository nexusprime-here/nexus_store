import type { Product } from "@prisma/client";
import Item from "./item";
import "./styles.css";

function Collection({ name, items }: { name: string, items: Product[] }) {
	const mappedItems = items.map((i) => <Item key={i.id} data={i} />);

	return (
		<div style={{ flexShrink: 0 }}>
			<p className="title"><span>{name}</span></p>
			<div className="row-overflow">
				{mappedItems}
			</div>
		</div>
	)
};

export default Collection;