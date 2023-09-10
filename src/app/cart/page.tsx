'use client';

import { useContext, useState } from "react";
import CartContext from "@context/CartContext";
import Product from "./product";
import Checkout from "./checkout";
import formatToBRL from "@utils/formatToBRL";

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

	const totalPrice = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

	return <>
		<Checkout open={checkoutOpen} onChangeOpen={() => setCheckoutOpen(v => !v)} price={totalPrice} />

		{products.length > 0 &&
			<div className="mt-20 mb-8">
				<h1 className="text-center font-semibold text-2xl">
					Seu carrinho
				</h1>

				<div className="flex mx-5 my-5 items-center justify-around">
					<button
						className="w-[50%]"
						onClick={handleClick}
						disabled={products.length < 1}
					>
						Finalizar Compra
					</button>
					<h3 className="text-center">Total: {formatToBRL(totalPrice)}</h3>
				</div>

				<ul className="mt-5 mx-4 space-y-2	min-h-[30%] flex flex-col">
					<>
						<p className=" text-center text-xs text-[rgba(var(--font-rgb),0.8)]">
							Arraste o produto para a direita para excluir
						</p>

						{products}
					</>
				</ul>
			</div>
		}


		<h1 className="text-center font-semibold text-2xl">
			Processados
		</h1>
	</>
}