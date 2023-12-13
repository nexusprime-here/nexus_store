import { notFound } from "next/navigation";
import Actions from "./actions";
import Image from "next/image";
import format from "@lib/formatters";
import type { Product } from "@prisma/client";
import prisma from "@lib/database";

export default async function Product({ params }: { params: { id: string } }) {
	const product = await prisma.product.findUnique({
		where: { id: parseInt(params.id) },
	});

	if (!product) {
		notFound();
	}

	return (
		<div className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-x-20 md:pt-10 lg:mx-20">
			{/* Image */}
			<div className="flex justify-center rounded-md border-detail md:w-[55%] md:border">
				<div className="relative h-60 w-full border-x-4 border-transparent md:row-span-3 md:h-[30vw] md:w-[30vw] md:border-0">
					<Image
						fill={true}
						className="rounded-md bg-white object-contain md:rounded-none md:bg-transparent"
						alt={product.name}
						src={`data:image/jpeg;base64,${product.icon}`}
					/>
				</div>
			</div>

			{/* Info */}
			<div className="md:w-[35%]">
				<div className="mx-8 mt-5 flex items-center justify-between md:m-0 md:mb-4 md:flex-col md:items-start">
					<h1 className="font-semibold md:mb-5 md:text-5xl">{product.name}</h1>
					<h2 className="ml-2 md:ml-0">{format.brl(product.price)}</h2>
				</div>
				<p className="mx-7 my-5 max-h-40 min-h-[5rem] overflow-hidden break-words font-light md:m-0 md:mb-8 md:text-lg">
					{product.description}
				</p>

				<Actions product={product} />
			</div>
		</div>
	);
}
