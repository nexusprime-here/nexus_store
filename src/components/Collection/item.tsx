"use client";

import type { Product } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@components/ui/Skeleton";

// TODO: Corrigir o erro abaixo. O erro provavelmente origina, por que o Link não deve conter childs
// Warning: Expected server HTML to contain a matching <a> in <div>.

export const Item: React.FC<{ data: Product }> = ({ data }) => {
	return (
		<Link
			prefetch={false}
			href={`/products/${data.id}`}
			className="w-28 mr-4 relative flex shrink-0 flex-col overflow-hidden"
		>
			<div className="w-full aspect-square relative">
				<Image
					className="rounded-lg bg-white"
					src={`data:image/jpeg;base64,${data.icon}`}
					fill
					alt={`img: ${data.name}`}
				/>
			</div>
			<span className="mt-1 text-center w-full h-14 break-words">{data.name}</span>
		</Link>
	);
};

export function SkeletonItem() {
	return (
		<div className="w-28 mr-4 relative flex shrink-0 flex-col">
			<div className="w-full relative">
				<Skeleton className="rounded-lg aspect-square" />
			</div>
			<Skeleton className="mt-2 h-5 w-full" />
		</div>
	)
}

export default Item;
