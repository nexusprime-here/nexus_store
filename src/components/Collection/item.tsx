/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import type { Product } from "@prisma/client";
import Link from 'next/link';

const Item: React.FC<{ data: Product }> = ({ data }) => {
	return (
		<Link prefetch={false} href={`/products/${data.id}`} className="product-item">
			<img src={data.iconURL} />
			<p>{data.name}</p>
		</Link>
	);
};

export default Item;