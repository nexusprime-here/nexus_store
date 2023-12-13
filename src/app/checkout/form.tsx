"use client";

import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import { UseFormReturn } from "react-hook-form";
import formatter from "@lib/formatters";
import type { FormInput } from "./page";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@components/structure/Accordion";
import { useEffect, useState } from "react";

// TODO: Implementar uma condição, caso o usuário já exista no db, não mostrar o form

function Form({ form }: { form: UseFormReturn<FormInput, any, undefined> }) {
	const [activeAccordions, setActiveAccordions] = useState(["delivery"]);

	const handleAccordionChange = (activeAccordions) => {
		setActiveAccordions(activeAccordions);
	};

	const { cep, nResidencia, complemento, cpf, name } = form.formState.errors;

	useEffect(() => {
		const newAccordionState = [...activeAccordions];

		if (cep || nResidencia) {
			if ("delivery" in newAccordionState) return;

			newAccordionState.push("delivery");
		}
		if (name || cpf) {
			if ("payment" in newAccordionState) return;

			newAccordionState.push("payment");
		}

		setActiveAccordions(newAccordionState);
	}, [cpf, name, cep, nResidencia]);

	return (
		<>
			<Accordion
				type="multiple"
				onValueChange={handleAccordionChange}
				value={activeAccordions}
				className="mx-10 flex flex-col space-y-5"
			>
				<AccordionDelivery
					form={form}
					onComplete={() => {
						setActiveAccordions((a) => [...a, "payment"]);
					}}
				/>

				<AccordionPayment form={form} />
			</Accordion>

			<div className="flex w-full items-center justify-center px-10">
				<Button placeholder="Comprar" loading={form.formState.isSubmitting} />
			</div>
		</>
	);
}

let completed = false;
function AccordionDelivery({
	form: { formState, register },
	onComplete,
}: {
	form: UseFormReturn<FormInput, any, undefined>;
	onComplete: Function;
}) {
	const { errors } = formState;

	const isCEPFilled = formState.dirtyFields.cep && !errors.cep;
	const isResidenciaFilled = formState.dirtyFields.nResidencia && !errors.nResidencia;

	useEffect(() => {
		if (!completed && isCEPFilled && isResidenciaFilled) {
			onComplete();
			completed = true;
		}
	}, [isCEPFilled, isResidenciaFilled, onComplete]);

	return (
		<AccordionItem value="delivery">
			<AccordionTrigger>Entrega</AccordionTrigger>
			<AccordionContent className="mx-4 space-y-2">
				<div className="flex space-x-3">
					<Input label="CEP" error={errors.cep} placeholder="00000-000" format={formatter.cep} {...register("cep")} />
					<Input
						label="N. da Residência"
						error={errors.nResidencia}
						placeholder="0"
						format={formatter.nResidencia}
						{...register("nResidencia")}
					/>
				</div>
				<Input
					label="Complemento ?"
					error={errors.complemento}
					placeholder="Ex: Ao lado da loja de doces"
					{...register("complemento")}
				/>
			</AccordionContent>
		</AccordionItem>
	);
}

function AccordionPayment({ form: { formState, register } }: { form: UseFormReturn<FormInput, any, undefined> }) {
	const { errors } = formState;

	return (
		<AccordionItem value="payment">
			<AccordionTrigger>Pagamento</AccordionTrigger>
			<AccordionContent className="mx-4 space-y-2">
				<Input label="Nome Completo" error={errors.name} {...register("name")} />

				<Input
					label="CPF"
					error={errors.cpf}
					format={formatter.cpf}
					placeholder="000.000.000-00"
					info={{
						title: "Por que o meu CPF?",
						description:
							"Precisamos do seu CPF para a autorização de transação do banco, não iremos fazer uso dessas informações.",
					}}
					{...register("cpf")}
				/>
			</AccordionContent>
		</AccordionItem>
	);
}

export default Form;
