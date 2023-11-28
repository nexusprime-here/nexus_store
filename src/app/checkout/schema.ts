import { PaymentMethods } from "@lib/constants";
import { z } from "zod";

const base = z.object({
	name: z.string()
		.trim()
		.min(2, 'Nome muito pequeno ou inexistente')
		.regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/, 'Que isso? apenas letras por favor!')
		.regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ]+(?: [a-zA-ZÀ-ÖØ-öø-ÿ]+)+$/, 'Quase lá! Só faltou seu sobrenome.'),

	ano: z.string()
		.min(1, 'Digite o ano'),

	sala: z.string()
		.min(1, 'Digite a letra da sala'),
});

const pix = z.object({
	method: z.literal(PaymentMethods.PIX),

	cpf: z.string()
		.regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido')
}).merge(base)

const money = z.object({
	method: z.literal(PaymentMethods.MONEY),

	cpf: z.string()
}).merge(base);

export default z.union([pix, money])