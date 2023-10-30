"use client";

import type { Product as ProductLi } from "@prisma/client";
import SwipeableView from "@components/SwipeableView";
import Link from "next/link";
import SwipeableViews from "react-swipeable-views";
import Image from "next/image";
import formatter from "@lib/formatters";
import Button from "@components/ui/Button";
import useCart from "@app/cart/hook";
import { useRouter } from "next/navigation";

function CartProducts() {
	const { cart, deleteItemFromCart } = useCart();
	const router = useRouter();

	const cartProducts = cart.map((item) => (
		<ProductLi
			value={{ ...item.product, quantity: item.quantity }}
			key={item.product.id}
			onDelete={() => {
				deleteItemFromCart(item.product.id);
			}}
		/>
	));

	const totalPrice = cart.reduce(
		(sum, item) => sum + item.product.price * item.quantity,
		0
	);

	const handleClick = () => {
		router.push("/checkout");
	};

	return (
		<div className="mb-8 mt-20">
			<h1 className="text-center text-2xl font-semibold">Seu carrinho</h1>

			{cartProducts.length > 0 ? (
				<>
					<div className="mx-5 my-5 flex items-center justify-around">
						<Button
							onClick={handleClick}
							placeholder="Finalizar Compra"
							className="w-[50%]"
						/>

						<h3 className="text-center">Total: {formatter.brl(totalPrice)}</h3>
					</div>

					<ul className="mx-4 mt-5 flex	min-h-[30%] flex-col space-y-2">
						<>
							<span className="text-center text-xs text-[rgba(var(--font-rgb),0.8)]">
								Arraste o produto para a direita para excluir
							</span>

							{cartProducts}
						</>
					</ul>
				</>
			) : (
				<div className="mx-10 mt-5 flex flex-col justify-center text-center">
					<p className="text-sm">Você ainda não adicionou nada ao carrinho</p>

					<Button
						className="mt-4 h-8 w-[40%] "
						link="/"
						placeholder="Voltar a Loja"
					/>
				</div>
			)}
		</div>
	);
}

interface Props {
	value: Omit<ProductLi, "collection"> & { quantity: number };
	onDelete: (ref: React.MutableRefObject<SwipeableViews>) => void;
}
function ProductLi({ value, onDelete }: Props) {
	return (
		<SwipeableView
			className="box rounded-xl"
			key={value.id}
			onDelete={onDelete}
			onEdit={() => console.log("onEdit")}
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
					{value.quantity > 1 && (
						<p className="text-xs font-light">
							{value.quantity} unidades de {formatter.brl(value.price)}
						</p>
					)}
				</div>
				<div className="w-[20%]">
					<h3>{formatter.brl(value.price * value.quantity)}</h3>
				</div>
			</Link>
		</SwipeableView>
	);
}

export default CartProducts;
