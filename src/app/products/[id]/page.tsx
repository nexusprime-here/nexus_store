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
		<div className="md:grid md:grid-cols-[60%,auto] md:gap-x-5 md:items-center md:justify-center md:pt-10 min-h-full flex-grow-0">
			<div className="relative h-60 border-x-4 border-transparent w-full md:h-[30vw] md:w-[30vw] md:border-0 md:row-span-3">
				<Image
					fill={true}
					className="rounded bg-white md:bg-transparent object-contain"
					alt={product.name}
					src={`data:image/jpeg;base64,${product.icon}`}
				/>
			</div>

			<div>
				<div className="mx-8 mt-5 md:m-0 flex items-center justify-between md:flex-col md:items-start md:mb-4">
					<h1 className="font-semibold md:text-5xl md:mb-5">{product.name}</h1>
					<h2 className="ml-2 md:ml-0">{format.brl(product.price)}</h2>
				</div>
				<p className="mx-7 my-5 md:m-0 min-h-[5rem] max-h-40 font-light md:text-lg break-words overflow-hidden">{product.description}</p>

				<Actions product={product} />
			</div>
		</div>
	)
}