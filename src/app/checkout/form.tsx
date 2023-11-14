'use client';

import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import { UseFormReturn } from "react-hook-form";
import formatter from "@lib/formatters";
import type { FormInput } from "./page";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@components/ui/Accordion";
import { RadioGroup, RadioGroupItem } from "@components/ui/Radio";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';

// TODO: Implementar uma condição, caso o usuário já exista no db, não mostrar o form

function Form({
	form,
}: {
	form: UseFormReturn<FormInput, any, undefined>;
}) {
	const [activeAccordions, setActiveAccordions] = useState(['delivery'])

	const handleAccordionChange = (activeAccordions) => {
		setActiveAccordions(activeAccordions);
	}

	const { ano, cpf, name, sala } = form.formState.errors;
	
	useEffect(() => {
		const newAccordionState = [...activeAccordions];

		if(ano || sala) {
			if('delivery' in newAccordionState) return;
			
			newAccordionState.push('delivery');
		}
		if(name || cpf) {
			if('payment' in newAccordionState) return;

			newAccordionState.push('payment');
		}

		setActiveAccordions(newAccordionState);
	}, [ano, cpf, name, sala])

	return (
		<>
			<Accordion type="multiple" onValueChange={handleAccordionChange} value={activeAccordions} className="flex flex-col space-y-5 mx-10">
				<AccordionDelivery 
					form={form} 
					onComplete={() => {
						setActiveAccordions(a => [...a, 'payment'])
					}} 
				/>
				
				<AccordionPayment form={form}/>
			</Accordion>

			<div className="w-full flex items-center justify-center px-10">
				<Button
					placeholder="Comprar"
					loading={form.formState.isSubmitting}
				/>
			</div>
		</>
	);
}

let completed = false;
function AccordionDelivery({ form: { formState, register }, onComplete }: {
	form: UseFormReturn<FormInput, any, undefined>;
	onComplete: Function
}) {
	const { errors } = formState;

	const isAnoFilled = formState.dirtyFields.ano && !errors.ano;
  	const isSalaFilled = formState.dirtyFields.sala && !errors.sala;


	useEffect(() => {
		if (!completed && isAnoFilled && isSalaFilled) {
			onComplete();
			completed = true;
		}
	}, [isAnoFilled, isSalaFilled, onComplete]);

	return (
		<AccordionItem value="delivery">
			<AccordionTrigger>Entrega</AccordionTrigger>
			<AccordionContent className="flex space-x-3 mx-4">
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
			</AccordionContent>
		</AccordionItem>
	)
}

function AccordionPayment({ form: { formState, register } }: { form: UseFormReturn<FormInput, any, undefined> }) {
	const { errors } = formState;
	const [pixData, setPixData] = useState(true);

	const paymentRadioChanged = (v: string) => {
		if(v == 'pix') {
			setPixData(true);
		} else {
			setPixData(false);
		}
	}

	return (
		<AccordionItem value="payment">
			<AccordionTrigger>Pagamento</AccordionTrigger>
			<AccordionContent className="mx-4">
				<RadioGroup defaultValue="pix" onValueChange={paymentRadioChanged}>
					<RadioGroupItem label="Pagar com Pix" value="pix" />
					<RadioGroupItem label="Pagar com dinheiro/pessoalmente" value="dinheiro" />
				</RadioGroup>
				
				<motion.div
					variants={{
						open: { opacity: 1, height: '10rem' },
						close: { opacity: 0, height: 0, padding: 0 },
					}}
					animate={pixData ? 'open' : 'close'}
					className="pt-8 space-y-3 transition"
				>
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
				</motion.div>
			</AccordionContent>
		</AccordionItem>
	)
}

export default Form;
