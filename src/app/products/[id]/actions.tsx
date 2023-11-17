"use client";

import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import useCart from "@app/cart/hook";
import Button from "@components/ui/Button";

function Actions({ product }: { product: Product }) {
	const router = useRouter();

	const [quantity, setQuantity] = React.useState(1);
	const { addItemToCart } = useCart();

	const handleBtnClick = () => {
		addItemToCart({
			product: {
				...product,
			},
			quantity,
		});

		router.push("/cart");
	};

	return (
		<div className="flex w-full justify-around">
			<div className="flex flex-row items-center">
				<Button
					className="h-7 w-7 border-[1px] border-solid border-white bg-transparent text-white"
					onClick={() => setQuantity((n) => (n == 1 ? n : n - 1))}
					placeholder="-"
				/>
				<p className="mx-3 text-lg">{quantity}</p>
				<Button
					className="h-7 w-7"
					onClick={() => setQuantity((n) => (n == 15 ? n : n + 1))}
					placeholder="+"
				/>
			</div>

			<Button
				onClick={handleBtnClick}
				className="w-40"
				placeholder="Adicionar ao Carrinho"
			/>
		</div>
	);
}

export default Actions;
