import { z } from "zod";

export default z.object({
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
});