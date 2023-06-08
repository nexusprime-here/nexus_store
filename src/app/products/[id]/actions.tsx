'use client';

import React from "react";

function Actions({ productId }: { productId: number }) {
	const [quantity, setQuantity] = React.useState<string>('1');

	const handleButtonClick = () => {
		location.href = `/checkout?pid=${productId}&q=${quantity}`;
	}

	const handleQuantityChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		setQuantity(e.target.value);
	}

	return (
		<>
			<div style={{ display: "flex", width: "90%" }}>
				<div className="quantityInput">
					<p>Quantidade:</p>
					<input type="number" min={1} value={quantity} onChange={handleQuantityChange} />
				</div>
			</div>
			<button onClick={handleButtonClick}>Comprar</button>
		</>
	)
}

export default Actions;