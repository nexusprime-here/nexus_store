import { SubmitHandler, useForm } from 'react-hook-form';
import { IoIosClose as CloseIcon } from 'react-icons/io'
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Err from '@utils/Err';

interface IProps {
	open: boolean,
	onChangeOpen: () => any
}

const schema = z.object({
	name: z.string()
		.min(2, 'Seu nome é muito pequeno, é seu mesmo?')
		.regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/, 'Que isso? apenas letras por favor!')
		.regex(/^(?:\b\w+\b\s+){1,}\b\w+\b$/, 'Quase lá! Só faltou seu sobrenome.'),

	cpf: z.string()
})

type FormInput = z.infer<typeof schema>;

function Checkout({ open, onChangeOpen }: IProps) {
	const { register, handleSubmit, formState, } = useForm<FormInput>({
		resolver: zodResolver(schema)
	});
	const { errors } = formState;

	const onSubmit: SubmitHandler<FormInput> = data => console.log(data);

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

			<main>
				<label>Nome Completo</label>
				<input {...register('name')} />
				<Err field={errors.name} />

				<label>CPF</label>
				<input {...register('cpf')} type='number' />
				<Err field={errors.cpf} />

				<button type="submit">Gerar Chave Pix</button>
			</main>
		</form>
	)
}

export default Checkout;