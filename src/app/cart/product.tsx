'use client'

import type { Product } from "@prisma/client";

interface Props {
	value: Product & { quantity: number }
}

function Product({ value }: Props) {
	return (
		<li className="box flex flex-row items-center space-x-2 p-2 pr-4 rounded-xl" key={value.id}>
			<img 
				src={value.iconURL} 
				alt={value.name}
				height={70}
				width={70}
				className="rounded-lg"
			/>
			<div>
				<h3 className="text-sm font-semibold">{value.name}</h3>
				{value.quantity > 1 && <p className="text-xs font-light">{value.quantity} unidades</p>}
			</div>
			<p>{value.price.toLocaleString('pt-br', { currency: 'BRL', style: 'currency' })}</p>
		</li>
	)
}

export default Product