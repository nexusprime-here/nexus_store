"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Pix from "@lib/gn-sdk/pix";
import CheckoutSchema from "@app/checkout/schema";
import { useState } from "react";
import * as order from "@lib/database/order";
import { z } from "zod";
import QrCode from "./qrcode";
import Form from "./form";
import useCart from "@app/cart/hook";

export type FormInput = z.infer<typeof CheckoutSchema>;

export default function Checkout() {
	const { cart, clearCart } = useCart();

	const [pix, setPix] = useState<Pix.CreateReturnType>();
	const form = useForm<FormInput>({
		resolver: zodResolver(CheckoutSchema),
	});

	const onSubmit: SubmitHandler<FormInput> = async (data) => {
		const pix = await Pix.create({
			cpf: data.cpf.replaceAll(".", "").replace("-", ""),
			nome: data.name,
			valor: cart.reduce(
				(sum, item) => sum + item.product.price * item.quantity,
				0
			),
		});

		setPix(pix);

		order.create({
			user: {
				name: data.name,
				ano: parseInt(data.ano),
				CPF: BigInt(data.cpf.replaceAll(".", "").replace("-", "")),
				fund: parseInt(data.fund),
				sala: data.sala,
			},
			productsId: cart.map(({ product }) => product.id),
			transationId: pix.txid,
		});

		clearCart();
	};

	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className="fixed left-0 top-0 mt-20 data-[open=false]:hidden"
		>
			<main className="mx-14 flex flex-col space-y-8">
				<div className="text-center">
					<h2 className="mb-4 font-semibold">Este é um ambiente seguro</h2>
					<p>
						As suas informações não serão utilizadas após a compra. Você poderá
						acompanhar status de entrega do seu produto.
					</p>
				</div>

				{pix ? <QrCode pix={pix} /> : <Form form={form} />}
			</main>
		</form>
	);
}
