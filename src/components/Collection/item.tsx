"use client";

import type { Product } from "@prisma/client";
import Link from 'next/link';
import Image from 'next/image';

// TODO: Corrigir o erro abaixo. O erro provavelmente origina, por que o Link não deve conter childs
// Warning: Expected server HTML to contain a matching <a> in <div>.

const Item: React.FC<{ data: Product }> = ({ data }) => {
	return (
		<Link
			prefetch={false}
			href={`/products/${data.id}`}
			className="shrink-0 flex flex-col mr-4 overflow-hidden"
		>
			<a>
				<Image
					className="rounded-lg"
					src={`data:image/jpeg;base64,${data.icon}`}
					width={120}
					height={120}
					alt={`img: ${data.name}`}
				/>
				<span className="text-center mt-1">{data.name}</span>
			</a>
		</Link>
	);
};

export default Item;