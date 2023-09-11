'use client';

import CartContext from "@context/CartContext";
import { Product } from "@prisma/client";
import { useRouter } from 'next/navigation';
import React, { useContext } from "react";

function Actions({ product }: { product: Product }) {
	const router = useRouter();

	const [quantity, setQuantity] = React.useState(1);
	const { addItemToCart } = useContext(CartContext);


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
					<button
						className="w-7 h-7 border-solid border-white border-[1px] bg-transparent text-white"
						onClick={() => setQuantity(n => n == 1 ? n : n - 1)}
					>
						-
					</button>
					<p className="mx-3 text-lg">{quantity}</p>
					<button
						className="w-7 h-7"
						onClick={() => setQuantity(n => n == 15 ? n : n + 1)}
					>
						+
					</button>
				</div>

				<button
					onClick={handleBtnClick}
					className="w-40"
				>
					Adicionar ao Carrinho
				</button>
			</div>
		</>
	)
}

export default Actions;