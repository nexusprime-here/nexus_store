'use client'

import { Product } from "@prisma/client";
import * as order from "@lib/order";
import { OrderStatus } from "@utils/enums";
import { useEffect, useState } from "react";
import getUser from "./getUser";

function StatusProducts() {
	const [processedProducts, setProcessedProducts] = useState<JSX.Element[]>([]);

	useEffect(() => {
		getUser().then(async cpf => {
			if (!cpf) return;

			const status = [OrderStatus.CREATED, OrderStatus.PAID];
			const orders = await order.findByUser(parseInt(cpf), { status })
			console.log({ orders })
			const products = orders.flatMap(o => o.products.map(p => ({ status: o.status, ...p })));

			setProcessedProducts(products.map(p => (
				<ProductLi value={{ ...p }} key={p.id} />
			)));
		})
	}, []);

	return (
		<div className="mt-5 flex flex-col">
			<h1 className="text-center font-semibold text-2xl">
				Processados
			</h1>

			{processedProducts.length > 0
				? (
					<ul className="mt-5 mx-4 space-y-2	min-h-[30%] flex flex-col">
						{processedProducts}
					</ul>
				)
				: (
					<div className="mt-5 mx-10 flex flex-col justify-center text-center">
						<p>Você ainda não comprou nada.</p>
					</div>
				)
			}
		</div>
	)
}

interface Props {
	value: Product & { status: OrderStatus }
}
function ProductLi({ value }: Props) {
	return (
		<li className="box rounded-xl flex flex-row items-center justify-between space-x-2 p-2 pr-4">
			<div className="flex-1 flex flex-row justify-between">
				<div className="flex flex-row space-x-5">
					<h2>1x</h2>

					<h2 className="text-lg">
						{value.name}
					</h2>
				</div>

				<StatusIndicator status={value.status} />
			</div>
		</li>
	)
}

function StatusIndicator({ status }: { status: OrderStatus }) {

	return (
		<h3 className="">
			{
				status == OrderStatus.CREATED
					? 'Esperando Pagamento'
					: status == OrderStatus.PAID
						? 'Pago'
						: '?'
			}
		</h3>
	)
}

export default StatusProducts;