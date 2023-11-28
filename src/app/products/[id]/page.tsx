import { notFound } from "next/navigation";
import Actions from "./actions";
import Image from "next/image";
import format from "@lib/formatters";
import type { Product } from "@prisma/client";
import prisma from '@lib/database';

export default async function Product({ params }: { params: { id: string } }) {
	const product = await prisma.product.findUnique({
		where: { id: parseInt(params.id) }
	})

	if(!product) {
		notFound();
	}

	return (
		<div className="md:grid md:grid-cols-[70%,auto] md:pt-10 min-h-full flex-grow-0">
			<div className="relative h-60 md:h-96 border-x-4 border-transparent w-full md:border-0 md:row-span-3">
				<Image
					fill={true}
					className="rounded bg-white md:bg-transparent object-contain"
					alt={product.name}
					src={`data:image/jpeg;base64,${product.icon}`}
				/>
			</div>

			<div className="md:bg-foreground md:border border-detail rounded-md">
				<div className="mx-8 mt-5 md:m-0 flex items-center justify-between">
					<h1 className="font-semibold">{product.name}</h1>
					<h2 className="ml-2">{format.brl(product.price)}</h2>
				</div>
				<p className="mx-7 my-5 min-h-[5rem] max-h-40 font-light break-words overflow-hidden">{product.description}</p>

				<Actions product={product} />
			</div>
		</div>
	)
}