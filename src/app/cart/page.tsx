'use client';

import useCart from "@context/CartContext"
import { Product } from "@prisma/client";
import prisma from "@root/utils/prisma";
import Image from "next/image";

export default async function Cart() {
	const { cart } = useCart();
	const products = await prisma.product.findMany({
		where: { id: { in: cart.map(i => i.productId) } },
	})
	
	return <>
		<div className="flex flex-col mx-12  items-center">
			<h1 className="text-center">Seu carrinho</h1>
			<button className="mt-5">Finalizar Compra</button>
		</div>

		<div>{ 
			cart
				.map(async i => {
					const product = products.find(p => p.id == i.productId) as Product;
					
					return (
						<div className="flex flex-row" key={product.id}>
							<Image src={product.iconURL} alt={product.name}/>
							<div>
								<p>{product.description}</p>
							</div>
							<p>{product.price}</p>
						</div>
					)
				})
		}</div>
	</>
}