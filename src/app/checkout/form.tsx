import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import { UseFormReturn } from "react-hook-form";
import formatter from "@lib/formatters";
import type { FormInput } from "./page";

// TODO: Implementar uma condição, caso o usuário já exista no db, não mostrar o form

function Form({
	form: { formState, register },
}: {
	form: UseFormReturn<FormInput, any, undefined>;
}) {
	const { errors, isSubmitting } = formState;

	return (
		<>
			<div className="flex flex-col space-y-5">
				<Input
					label="Nome Completo"
					error={errors.name}
					{...register("name")}
				/>

				<Input
					label="CPF"
					error={errors.cpf}
					format={formatter.cpf}
					placeholder="000.000.000-00"
					info={{
						title: 'Por que o meu CPF?',
						description: 'Precisamos do seu CPF para a autorização de transação do banco, não iremos fazer uso dessas informações.'
					}}
					{...register("cpf")}
				/>

				<div className="flex space-x-3">
					<Input
						label="Ano"
						error={errors.ano}
						placeholder="2"
						format={formatter.ano}
						{...register("ano")}
					/>
					<Input
						label="Sala"
						error={errors.sala}
						placeholder="A"
						format={formatter.sala}
						{...register("sala")}
					/>
				</div>
			</div>

			<Button
				className="w-full"
				placeholder="Gerar chave pix"
				loading={isSubmitting}
			/>
		</>
	);
}

export default Form;
