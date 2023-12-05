"use client";

import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import useCart from "@app/cart/hook";
import Button from "@components/ui/Button";

function Actions({ product }: { product: Product }) {
	const router = useRouter();

	const [quantity, setQuantity] = React.useState(1);
	const [btnLoading, setBtnLoading] = React.useState(false);
	const { addItemToCart } = useCart();

	const handleBtnClick = () => {
		setBtnLoading(true);

		addItemToCart({
			product: {
				...product,
			},
			quantity,
		});

		router.push("/cart");
	};

	return (
		<div className="flex w-full justify-around space-y-8 md:flex-col">
			<div className="flex flex-row items-center">
				<Button
					className="text-white h-7 w-7 border-[1px] border-solid border-white bg-transparent"
					onClick={() => setQuantity((n) => (n == 1 ? n : n - 1))}
					placeholder="-"
				/>
				<p className="mx-3 text-lg">{quantity}</p>
				<Button className="h-7 w-7" onClick={() => setQuantity((n) => (n == 15 ? n : n + 1))} placeholder="+" />
			</div>

			<Button
				loading={btnLoading}
				onClick={handleBtnClick}
				className="w-40 md:h-14 md:w-full md:text-lg"
				placeholder="Adicionar ao Carrinho"
			/>
		</div>
	);
}

export default Actions;
