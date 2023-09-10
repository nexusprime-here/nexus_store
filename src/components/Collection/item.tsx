/* eslint-disable @next/next/no-img-element */
"use client";

import type { Product } from "@prisma/client";
import Link from 'next/link';

// TODO: Corrigir o erro abaixo. O erro provavelmente origina, por que o Link não deve conter childs
// Warning: Expected server HTML to contain a matching <a> in <div>.

const Item: React.FC<{ data: Product }> = ({ data }) => {
	return (
		<Link prefetch={false} href={`/products/${data.id}`} className="product-item">
			<img src={data.iconURL} alt={`img: ${data.name}`} />
			<p>{data.name}</p>
		</Link>
	);
};

export default Item;