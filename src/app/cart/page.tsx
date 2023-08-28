'use client';

import { useContext } from "react";
import CartContext from "@context/CartContext";
import Product from "./product";

export default function Cart() {
	const { cart, deleteItemFromCart } = useContext(CartContext);

	const products = cart.map(item => {
		return <Product
			value={{ ...item.product, quantity: item.quantity, }}
			key={item.product.id}
			onDelete={() => {
				deleteItemFromCart(item.product.id);
			}}
		/>
	})


	return <>
		<div className="flex flex-col mx-12  items-center">
			<h1 className="text-center">Seu carrinho</h1>
			<button className="mt-5">Finalizar Compra</button>
		</div>


		<ul className="mt-10 mx-4 space-y-2	min-h-[30%] flex flex-col">
			{
				products.length > 0
					? <>
						<p className=" text-center text-xs text-[rgba(var(--font-rgb),0.4)]">
							Arraste o produto para a esquerda para excluir
						</p>

						{products}
					</>
					: <p className="text-center px-5">Você ainda não adicionou nenhum produto ao seu carrinho</p>
			}
		</ul>
	</>
}