'use client';

import fetchProductsById from "./fetchProducts";
import { useContext, useEffect, useState, JSX } from "react";
import CartContext, { CartItem } from "@context/CartContext";
import Product from "./product";
import { AiOutlineLoading as Loading } from "react-icons/ai";

export default function Cart() {
	const [products, setProducts] = useState<JSX.Element[]>([]);
	const [loading, setLoading] = useState(true);
	const { cart, deleteItemFromCart } = useContext(CartContext);

	useEffect(() => {
		const productsId = cart.map(i => i.productId);

		fetchProductsById(productsId).then(products => {
			setProducts(products.map(product => {
				const quantity = (cart.find(i => i.productId == product.id) as CartItem).quantity;

				return <Product
					value={{ ...product, quantity }}
					key={product.id}
					onDelete={() => {
						deleteItemFromCart(product.id);
					}}
				/>
			}));
			setLoading(false);
		});
	}, [cart]);


	return <>
		<div className="flex flex-col mx-12  items-center">
			<h1 className="text-center">Seu carrinho</h1>
			<button className="mt-5">Finalizar Compra</button>
		</div>

		<p className="mt-10 text-center text-xs text-[rgba(var(--font-rgb),0.4)]">Arraste o produto para a esquerda para excluir</p>

		<ul className="mt-10 mx-4 space-y-2	min-h-[30%] flex flex-col">
			{loading
				? <div className="flex-grow flex items-center justify-center">
					<Loading className="animate-spin" size={30} />
				</div>
				: products.length > 1
					? products
					: <p className="text-center px-5">Você ainda não adicionou nenhum produto ao seu carrinho</p>
			}
		</ul>
	</>
}