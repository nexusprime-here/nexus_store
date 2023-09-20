'use client'

import type { Product as ProductLi } from "@prisma/client";
import SwipeableView from "@components/SwipeableView";
import Link from "next/link";
import SwipeableViews from "react-swipeable-views";
import Image from 'next/image';
import formatter from "@root/lib/formatter";
import Button from "@components/Button";
import useCart from "@root/app/cart/hook";
import { useRouter } from "next/navigation";

function CartProducts() {
	const { cart, deleteItemFromCart } = useCart();
	const router = useRouter();

	const cartProducts = cart.map(
		item => <ProductLi
			value={{ ...item.product, quantity: item.quantity }}
			key={item.product.id}
			onDelete={() => {
				deleteItemFromCart(item.product.id);
			}}
		/>
	);

	const totalPrice = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

	const handleClick = () => {
		router.push('/checkout');
	}

	return cartProducts.length > 0
		? (

			<div className="mt-5 mb-8">
				<h1 className="text-center font-semibold text-2xl">
					Seu carrinho
				</h1>

				<div className="flex mx-5 my-5 items-center justify-around">
					<Button
						onClick={handleClick}
						placeholder="Finalizar Compra"
						className="w-[50%]"
					/>

					<h3 className="text-center">Total: {formatter.brl(totalPrice)}</h3>
				</div>

				<ul className="mt-5 mx-4 space-y-2	min-h-[30%] flex flex-col">
					<>
						<span className="text-center text-xs text-[rgba(var(--font-rgb),0.8)]">
							Arraste o produto para a direita para excluir
						</span>

						{cartProducts}
					</>
				</ul>
			</div>
		)
		: <></>
}

interface Props {
	value: Omit<ProductLi, 'collection'> & { quantity: number }
	onDelete: (ref: React.MutableRefObject<SwipeableViews>) => void
}
function ProductLi({ value, onDelete }: Props) {
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
					<h2 className="text-sm">
						{value.name}
					</h2>
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

export default CartProducts;