"use client";

import { Product } from "@prisma/client";
import * as order from "@lib/database/order";
import { OrderStatus } from "@lib/constants";
import { useEffect, useState } from "react";
import getUser from "./getUser";

function StatusProducts() {
	const [processedProducts, setProcessedProducts] = useState<JSX.Element[]>([]);

	useEffect(() => {
		getUser().then(async (cpf) => {
			if (!cpf) return;

			const status = [OrderStatus.CREATED, OrderStatus.PAID];
			const orders = await order.findByUser(parseInt(cpf), { status });
			const products = orders.flatMap((o) =>
			// @ts-ignore
				o.products.map((p) => ({ status: o.status, ...p }))
			);

			setProcessedProducts(
				products.map((p) => <ProductLi value={{ ...p }} key={p.id} />)
			);
		});
	}, []);

	return (
		<div className="mt-5 flex flex-col">
			<h1 className="text-center text-2xl font-semibold">Processados</h1>

			{processedProducts.length > 0 ? (
				<ul className="mx-4 mt-5 flex	min-h-[30%] flex-col space-y-2">
					{processedProducts}
				</ul>
			) : (
				<div className="mx-10 mt-5 flex flex-col justify-center text-center">
					<p>Você ainda não comprou nada.</p>
				</div>
			)}
		</div>
	);
}

interface Props {
	value: Product & { status: OrderStatus };
}
function ProductLi({ value }: Props) {
	return (
		<li className="box flex flex-row items-center justify-between space-x-2 rounded-xl p-2 pr-4">
			<div className="flex flex-1 flex-row justify-between">
				<div className="flex flex-row space-x-5">
					<h2>1x</h2>

					<h2 className="text-lg">{value.name}</h2>
				</div>

				<StatusIndicator status={value.status} />
			</div>
		</li>
	);
}

function StatusIndicator({ status }: { status: OrderStatus }) {
	return (
		<h3 className="">
			{status == OrderStatus.CREATED
				? "Esperando Pagamento"
				: status == OrderStatus.PAID
				? "Pago"
				: "?"}
		</h3>
	);
}

export default StatusProducts;
