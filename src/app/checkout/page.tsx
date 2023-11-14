"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Pix from "@lib/gn-sdk";
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

		order.create({
			user: {
				name: data.name,
				ano: parseInt(data.ano),
				CPF: BigInt(data.cpf.replaceAll(".", "").replace("-", "")),
				sala: data.sala
			},
			productsId: cart.map(p => ({ id: p.product.id, q: p.quantity })),
			transationId: pix.txid,
		});
		
		setPix(pix);

		clearCart();
	};

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className="left-0 top-0">
			<main className="flex flex-col space-y-8">
				<div className="text-center mx-[8vh]">
					<h3 className="mb-4 font-semibold">Este é um ambiente seguro</h3>
					<p>
						As suas informações não serão utilizadas após a compra. 
						Você poderá acompanhar status de entrega do seu produto clicando no ícone do WhatsApp.
					</p>
				</div>

				{pix ? <QrCode pix={pix} /> : <Form form={form} />}
			</main>
		</form>
	);
}
