'use client'

import { SubmitHandler, useForm } from 'react-hook-form';
import { IoIosClose as CloseIcon } from 'react-icons/io'
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createPix } from '@utils/gerencianet';
import Input from '@components/Input';

interface IProps {
	open: boolean,
	onChangeOpen: () => any,
	price: number
}

const schema = z.object({
	name: z.string()
		.min(2, 'Nome muito pequeno ou inexistente')
		.regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/, 'Que isso? apenas letras por favor!')
		.regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ]+(?: [a-zA-ZÀ-ÖØ-öø-ÿ]+)+$/, 'Quase lá! Só faltou seu sobrenome.'),

	cpf: z.string()
		.regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido'),

	ano: z.string()
		.min(1, 'Digite o ano'),

	fund: z.string()
		.min(1, 'Digite 1/2 para Ens. Fundamental e 3 para Ens. Médio'),

	sala: z.string()
		.min(1, 'Digite a letra da sala')
})

type FormInput = z.infer<typeof schema>;

function Checkout({ open, onChangeOpen, price }: IProps) {
	const { register, handleSubmit, formState } = useForm<FormInput>({
		resolver: zodResolver(schema)
	});
	const { errors } = formState;

	const onSubmit: SubmitHandler<FormInput> = async data => {
		const pix = await createPix({ cpf: data.cpf, nome: data.name }, price.toString())
			.catch(console.log)
		console.log({ pix })
	};

	const formatToCPF = (value: string) => {
		value = value.replace(/\D/g, '');

		if (value.length > 11) {
			value = value.substring(0, 11);
		}

		value = value.replace(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/, function (match, g1, g2, g3, g4) {
			var result = (g1 || '') + (g2 ? '.' + g2 : '') + (g3 ? '.' + g3 : '') + (g4 ? '-' + g4 : '');
			return result;
		});

		return value;
	}

	const formatToAno = (value: string) => {
		return value[0]?.replace(/[a-zA-ZÀ-ÿ.,;!?'"()\[\]\{\}]/g, '');
	}

	const formatToFund = (value: string) => {
		return value[0]?.replace(/[[a-zA-ZÀ-ÿ.,;!?'"()\[\]\{\}]/g, '')
	}

	const formatToSala = (value: string) => {
		return value[0]?.toUpperCase().replace(/[À-ÿ0-9.,;!?'"()\[\]\{\}]/g, '');
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
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

			<main className='flex flex-col mx-14 space-y-14'>
				<div className='text-center'>
					<h2 className='font-semibold mb-4'>Este é um ambiente seguro</h2>
					<p>As suas informações não serão utilizadas após a compra. Você poderá acompanhar status de entrega do seu produto.</p>
					<br />
					<p>Muito obrigado pela compra!</p>
				</div>
				<div className='flex flex-col space-y-5'>
					<Input
						label='Nome Completo'
						error={errors.name}
						{...register('name')}
					/>

					<Input
						label='CPF'
						error={errors.cpf}
						format={formatToCPF}
						placeholder='000.000.000-00'
						{...register('cpf')}
					/>

					<div className='flex space-x-3'>
						<Input
							label='Ano'
							error={errors.ano}
							placeholder='2'
							format={formatToAno}
							{...register('ano')}
						/>
						<Input
							label='Sala'
							error={errors.sala}
							placeholder='A'
							format={formatToSala}
							{...register('sala')}
						/>
						<Input
							label='Fund.'
							error={errors.fund}
							placeholder='3'
							format={formatToFund}
							{...register('fund')}
						/>
					</div>
				</div>

				<button className='w-full'>Gerar Chave Pix</button>
			</main>
		</form>
	)
}

export default Checkout;