'use client'

import { SubmitHandler, UseFormReturn, useForm } from 'react-hook-form';
import { IoIosClose as CloseIcon } from 'react-icons/io'
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PixObj, createPix } from '@utils/gerencianet';
import Input from '@components/Input';
import CheckoutSchema from '@schemas/Checkout'
import formatter from '@root/utils/formatter';
import { useState } from 'react';
import Image from 'next/image';

interface IProps {
	open: boolean,
	onChangeOpen: () => any,
	price: number
}

type FormInput = z.infer<typeof CheckoutSchema>;

function Form({ form: { formState, register } }: { form: UseFormReturn<FormInput, any, undefined> }) {
	const { errors } = formState;

	return <>
		<div className='flex flex-col space-y-5'>
			<Input
				label='Nome Completo'
				error={errors.name}
				{...register('name')}
			/>

			<Input
				label='CPF'
				error={errors.cpf}
				format={formatter.cpf}
				placeholder='000.000.000-00'
				{...register('cpf')}
			/>

			<div className='flex space-x-3'>
				<Input
					label='Ano'
					error={errors.ano}
					placeholder='2'
					format={formatter.ano}
					{...register('ano')}
				/>
				<Input
					label='Sala'
					error={errors.sala}
					placeholder='A'
					format={formatter.sala}
					{...register('sala')}
				/>
				<Input
					label='Fund.'
					error={errors.fund}
					placeholder='3'
					format={formatter.fund}
					{...register('fund')}
				/>
			</div>
		</div>

		<button className='w-full'>Gerar Chave Pix</button>
	</>
}
function QrCode({ pix }: { pix: PixObj }) {
	return <>

		<Image
			src={pix.imagemQrcode}
			alt='qrcode'
			height={200}
			width={200}
		/>
		<p>{pix.qrcode}</p>
	</>
}

function Checkout({ open, onChangeOpen, price }: IProps) {
	const [pix, setPix] = useState<PixObj>();
	const form = useForm<FormInput>({
		resolver: zodResolver(CheckoutSchema)
	});

	const onSubmit: SubmitHandler<FormInput> = async data => {
		const pix = await createPix({
			cpf: data.cpf.replaceAll('.', '').replace('-', ''),
			nome: data.name,
			valor: price
		});

		setPix(pix);
	};

	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			data-open={open}
			className="z-20 fixed top-0 left-0 w-screen h-screen bg-black data-[open=false]:hidden"
		>
			<header className='flex flex-row-reverse'>
				<CloseIcon
					size={30}
					className='mt-3 mr-3'
					onClick={onChangeOpen}
				/>
			</header>

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