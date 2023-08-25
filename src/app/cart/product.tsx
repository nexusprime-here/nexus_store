'use client'

import type { Product } from "@prisma/client";
import SwipeableView from "@components/SwipeableLi";
import Link from "next/link";
import SwipeableViews from "react-swipeable-views";

interface Props {
	value: Product & { quantity: number }
	onDelete: (ref: React.MutableRefObject<SwipeableViews>) => void
}

function Product({ value, onDelete }: Props) {
	return (
		<SwipeableView
			className="box rounded-xl"
			onDelete={onDelete}
			onEdit={() => console.log('onEdit')}
			key={value.id}
		>
			<Link className="flex flex-row items-center space-x-2 p-2 pr-4" prefetch={false} href={`/products/${value.id}`}>
				<img
					src={value.iconURL}
					alt={value.name}
					height={70}
					width={70}
					className="rounded-lg"
				/>
				<div>
					<h3 className="text-sm">{value.name}</h3>
					{value.quantity > 1 && <p className="text-xs font-light">{value.quantity} unidades</p>}
				</div>
				<p>{value.price.toLocaleString('pt-br', { currency: 'BRL', style: 'currency' })}</p>
			</Link>
		</SwipeableView>
	)
}

export default Product