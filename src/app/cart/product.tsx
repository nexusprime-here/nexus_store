'use client'

import type { Product } from "@prisma/client";
import SwipeableView from "@components/SwipeableView";
import Link from "next/link";
import SwipeableViews from "react-swipeable-views";
import Image from 'next/image';
import formatter from "@root/utils/formatter";

interface Props {
	value: Omit<Product, 'collection'> & { quantity: number }
	onDelete: (ref: React.MutableRefObject<SwipeableViews>) => void
}

function Product({ value, onDelete }: Props) {
	return (
		<SwipeableView className="box rounded-xl" key={value.id}
			onDelete={onDelete}
			onEdit={() => console.log('onEdit')}
		>
			<Link
				className="flex flex-row items-center justify-between space-x-2 p-2 pr-4"
				prefetch={false}
				href={`/products/${value.id}`}
			>
				<Image
					src={`data:image/jpeg;base64,${value.icon}`}
					alt={value.name}
					height={70}
					width={70}
					className="rounded-lg"
				/>
				<div className="flex-1">
					<h2 className="text-sm">{value.name}</h2>
					{value.quantity > 1 && <p className="text-xs font-light">{value.quantity} unidades de {formatter.brl(value.price)}</p>}
				</div>
				<div className="w-[20%]">
					<h3>
						{formatter.brl(value.price * value.quantity)}
					</h3>
				</div>
			</Link>
		</SwipeableView>
	)
}

export default Product