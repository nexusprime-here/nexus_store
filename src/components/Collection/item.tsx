/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import type { Product } from "@prisma/client";

const Item: React.FC<{ data: Product }> = ({ data }) => {
	const handleClick = () => {
		location.href = `/products/${data.id}`;
	};

	return (
		<div className="product-item" onTouchEnd={handleClick}>
			<img src={data.iconURL} />
			<p>{data.name}</p>
		</div>
	);
};

export default Item;