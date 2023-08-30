'use client';

import { useContext, useState } from "react";
import CartContext from "@context/CartContext";
import Product from "./product";
import Checkout from "./checkout";
import formatToBRL from "@root/utils/formatToBRL";

export default function Cart() {
	const { cart, deleteItemFromCart } = useContext(CartContext);
	const [checkoutOpen, setCheckoutOpen] = useState(false);

	const products = cart.map(item => {
		return <Product
			value={{ ...item.product, quantity: item.quantity, }}
			key={item.product.id}
			onDelete={() => {
				deleteItemFromCart(item.product.id);
			}}
		/>
	});

	const handleClick = () => {
		setCheckoutOpen(true);
	}

	return <>
		<Checkout open={checkoutOpen} onChangeOpen={() => setCheckoutOpen(v => !v)} />

		<div className="flex flex-col mx-12 items-center">
			<h1 className="text-center">Seu carrinho</h1>
			<button
				className="mt-5"
				onClick={handleClick}
				disabled={products.length < 1}
			>
				Finalizar Compra
			</button>
			{products.length > 0 && <h3 className="text-center mt-4">Total: {formatToBRL(
				cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
			)}</h3>}
		</div>


		<ul className="mt-5 mx-4 space-y-2	min-h-[30%] flex flex-col">
			{
				products.length > 0
					? <>
						<p className=" text-center text-xs text-[rgba(var(--font-rgb),0.8)]">
							Arraste o produto para a direita para excluir
						</p>

						{products}
					</>
					: <p className="text-center px-5">Você ainda não adicionou nenhum produto ao seu carrinho</p>
			}
		</ul>
	</>
}