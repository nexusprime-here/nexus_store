'use client';

import CartContext from "@context/CartContext";
import { useRouter } from 'next/navigation';
import React, { useContext } from "react";

function Actions({ productId }: { productId: number }) {
	const router = useRouter();
	const [quantity, setQuantity] = React.useState(1);
	const { addItemToCart, deleteItemFromCart, cart } = useContext(CartContext);

	const handleQuantityChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		setQuantity(parseInt(e.target.value));
	}

	const handleBtnClick = () => {
		addItemToCart({productId, quantity});
		router.push('/cart')
	}

	return (
		<>
			<div style={{ display: "flex", width: "90%" }}>
				<div className="quantityInput">
					<p>Quantidade:</p>
					<input type="number" min={1} value={quantity} onChange={handleQuantityChange} />
				</div>
			</div>
			<button onClick={handleBtnClick}>Adicionar ao Carrinho</button>
		</>
	)
}

export default Actions;