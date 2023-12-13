"use client";

import type { Product } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@components/utils/Skeleton";

// TODO: Corrigir o erro abaixo. O erro provavelmente origina, por que o Link não deve conter childs
// Warning: Expected server HTML to contain a matching <a> in <div>.

export const Item: React.FC<{ data: Product }> = ({ data }) => {
	return (
		<Link
			prefetch={false}
			href={`/products/${data.id}`}
			className="relative mr-4 flex w-28 shrink-0 flex-col overflow-hidden border-detail md:w-[15vw] md:rounded-lg md:border md:bg-foreground lg:w-[12vw]"
		>
			<div className="relative mt-3 aspect-square w-full">
				<Image
					className="rounded-lg bg-white md:rounded-sm"
					src={`data:image/jpeg;base64,${data.icon}`}
					fill
					alt={`img: ${data.name}`}
				/>
			</div>
			<span className="mt-1 h-14 w-full break-words text-center">{data.name}</span>
		</Link>
	);
};

export function SkeletonItem() {
	return (
		<div className="relative mr-4 flex w-28 shrink-0 flex-col md:w-[15vw] lg:w-[12vw]">
			<div className="relative w-full">
				<Skeleton className="aspect-square rounded-lg md:rounded-b-none" />
			</div>
			<Skeleton className="mt-2 h-5 w-full md:m-0 md:h-[4.6rem] md:rounded-t-none" />
		</div>
	);
}

export default Item;
