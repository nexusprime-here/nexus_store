'use client';

import fetchProductsById from "./fetchProducts";
import { useContext, useEffect, useState, JSX } from "react";
import CartContext, { CartItem } from "@context/CartContext";
import Product from "./product";

export default function Cart() {
	const [products, setProducts] = useState<JSX.Element[]>([]);
	const { cart } = useContext(CartContext);

	useEffect(() => {
		const productsId = cart.map(i => i.productId);

		fetchProductsById(productsId).then(products => {
			setProducts(products.map(product => {
				const quantity = (cart.find(i => i.productId == product.id) as CartItem).quantity;
				
				return <Product value={{...product, quantity }} key={product.id}/>
			}));
		});
	}, [cart]);
	

	return <>
		<div className="flex flex-col mx-12  items-center">
			<h1 className="text-center">Seu carrinho</h1>
			<button className="mt-5">Finalizar Compra</button>
		</div>

		<ul className="mt-10 mx-4 space-y-3">
			<p className="text-center text-xs text-[rgba(var(--font-rgb),0.4)]">Arraste o produto para a esquerda para excluir</p>
			{ 
				products.length < 1 
					? <p>Carregando...</p>
					: products
			}
		</ul>
	</>
}