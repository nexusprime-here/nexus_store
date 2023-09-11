/* eslint-disable @next/next/no-img-element */
import prisma from "@utils/prisma";
import { notFound } from "next/navigation";
import Actions from "./actions";
import Image from "next/image";

export default async function Product({ params }: { params: { id: string } }) {
	const product = await prisma.product.findUnique({
		where: {
			id: parseInt(params.id),
		},
	});

	if (!product) {
		return notFound();
	}

	const formatter = new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	})

	return (
		<>
			<Image
				className="h-60 w-full object-contain bg-white rounded"
				width={200}
				height={200}
				alt={product.name}
				src={`data:image/jpeg;base64,${product.icon}`}
			/>

			<div className="mx-8 mt-5 flex items-center justify-between">
				<h1 className="font-semibold">{product.name}</h1>
				<h2>{formatter.format(product.price)}</h2>
			</div>
			<p className="mx-7 mt-5 h-32 font-light">{product.description}</p>

			<Actions product={product} />
		</>
	);
}
