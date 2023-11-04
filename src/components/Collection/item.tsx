"use client";

import type { Product } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

// TODO: Corrigir o erro abaixo. O erro provavelmente origina, por que o Link não deve conter childs
// Warning: Expected server HTML to contain a matching <a> in <div>.

const Item: React.FC<{ data: Product }> = ({ data }) => {
	return (
		<Link
			prefetch={false}
			href={`/products/${data.id}`}
			className="mr-4 flex shrink-0 flex-col overflow-hidden"
		>
			<Image
				className="rounded-lg bg-white"
				src={`data:image/jpeg;base64,${data.icon}`}
				width={120}
				height={120}
				alt={`img: ${data.name}`}
			/>
			<span className="mt-1 text-center">{data.name}</span>
		</Link>
	);
};

export default Item;
