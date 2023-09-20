'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PixObj, createPix } from '@lib/gerencianet';
import CheckoutSchema from '@app/checkout/schema'
import { useState } from 'react';
import * as order from '@lib/order';
import { z } from 'zod';
import QrCode from './qrcode';
import Form from './form';
import useCart from '@app/cart/hook';

export type FormInput = z.infer<typeof CheckoutSchema>;

function Checkout() {
	const { cart, clearCart } = useCart();

	const [pix, setPix] = useState<PixObj>();
	const form = useForm<FormInput>({
		resolver: zodResolver(CheckoutSchema)
	});

	const onSubmit: SubmitHandler<FormInput> = async data => {
		const pix = await createPix({
			cpf: data.cpf.replaceAll('.', '').replace('-', ''),
			nome: data.name,
			valor: cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
		});

		setPix(pix);

		order.create({
			user: {
				name: data.name,
				ano: parseInt(data.ano),
				CPF: parseInt(data.cpf.replaceAll('.', '').replace('-', '')),
				fund: parseInt(data.fund),
				sala: data.sala
			},
			productsId: cart.map(({ product }) => product.id),
			transationId: pix.txid
		});

		clearCart();
	};

	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className="mt-20 fixed top-0 left-0 data-[open=false]:hidden"
		>
			<main className='flex flex-col mx-14 space-y-8'>
				<div className='text-center'>
					<h2 className='font-semibold mb-4'>Este é um ambiente seguro</h2>
					<p>As suas informações não serão utilizadas após a compra. Você poderá acompanhar status de entrega do seu produto.</p>
				</div>

				{pix
					? <QrCode pix={pix} />
					: <Form form={form} />
				}
			</main>
		</form>
	)
}

export default Checkout;