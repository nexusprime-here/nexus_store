'use client'

import { SubmitHandler, useForm } from 'react-hook-form';
import { IoIosClose as CloseIcon } from 'react-icons/io'
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Err from '@utils/Err';
import { createPix } from '@root/utils/gerencianet';
import Input from '@root/components/Input';

interface IProps {
	open: boolean,
	onChangeOpen: () => any,
	price: number
}

const schema = z.object({
	name: z.string()
		.min(2, 'Seu nome é muito pequeno, é seu mesmo?')
		.regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/, 'Que isso? apenas letras por favor!')
		.regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ]+(?: [a-zA-ZÀ-ÖØ-öø-ÿ]+)+$/, 'Quase lá! Só faltou seu sobrenome.'),

	cpf: z.string()
		.regex(/^\d{11}$/, 'CPF inválido')
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

		value = value.replace(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/, function (match, g1, g2, g3, g4) {
			var result = (g1 || '') + (g2 ? '.' + g2 : '') + (g3 ? '.' + g3 : '') + (g4 ? '-' + g4 : '');
			return result;
		});

		return value;
	}

	const formatYear = (value: string) => {
		console.log({ value })
		value = value.replace(/\D/g, '');

		return value?.[0];
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

			<main className='flex flex-col mx-14 space-y-8'>
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
						{...register('cpf')}
					/>

					{/* <Input
						label='Ano'
						format={formatYear}
					/> */}
				</div>

				<button className='w-full'>Gerar Chave Pix</button>
			</main>
		</form>
	)
}

export default Checkout;