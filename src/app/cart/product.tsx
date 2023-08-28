'use client'

import type { Product } from "@prisma/client";
import SwipeableView from "@components/SwipeableView";
import Link from "next/link";
import SwipeableViews from "react-swipeable-views";

const formatToBRL = new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL",
}).format

interface Props {
	value: Omit<Product, 'collection'> & { quantity: number }
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
			<Link className="flex flex-row items-center justify-between space-x-2 p-2 pr-4" prefetch={false} href={`/products/${value.id}`}>
				<img
					src={value.iconURL}
					alt={value.name}
					height={70}
					width={70}
					className="rounded-lg"
				/>
				<div className="flex-1">
					<h2 className="text-sm">{value.name}</h2>
					{value.quantity > 1 && <p className="text-xs font-light">{value.quantity} unidades de {formatToBRL(value.price)}</p>}
				</div>
				<div className="w-[20%]">
					<h3>
						{formatToBRL(value.price * value.quantity)}
					</h3>
				</div>
			</Link>
		</SwipeableView>
	)
}

export default Product