'use client';

import { Product } from "@prisma/client";
import { useRouter } from 'next/navigation';
import React from "react";
import useCart from "@root/app/cart/hook";
import Button from "@root/components/Button";

function Actions({ product }: { product: Product }) {
	const router = useRouter();

	const [quantity, setQuantity] = React.useState(1);
	const { addItemToCart } = useCart();


	const handleBtnClick = () => {
		addItemToCart({
			product: {
				...product
			}, quantity
		});

		router.push('/cart');
	}

	return (
		<>
			<div className="w-full flex justify-around">
				<div className="flex flex-row items-center">
					<Button
						className="w-7 h-7 border-solid border-white border-[1px] bg-transparent text-white"
						onClick={() => setQuantity(n => n == 1 ? n : n - 1)}
						placeholder="-"
					/>
					<p className="mx-3 text-lg">{quantity}</p>
					<Button
						className="w-7 h-7"
						onClick={() => setQuantity(n => n == 15 ? n : n + 1)}
						placeholder="+"
					/>
				</div>

				<Button
					onClick={handleBtnClick}
					className="w-40"
					placeholder="Adicionar ao Carrinho"
				/>
			</div>
		</>
	)
}

export default Actions;