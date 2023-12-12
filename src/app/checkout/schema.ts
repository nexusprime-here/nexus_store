import { z } from "zod";

export default z.object({
	name: z
		.string({ required_error: "Esqueceu de colocar seu nome!" })
		.trim()
		.min(2, "Nome muito pequeno ou inexistente")
		.regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/, "Que isso? apenas letras por favor!")
		.regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ]+(?: [a-zA-ZÀ-ÖØ-öø-ÿ]+)+$/, "Quase lá! Só faltou seu sobrenome."),

	cpf: z.string({ required_error: "Esqueceu de colocar seu CPF!" }).regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),

	cep: z.string().regex(/^\d{5}-\d{3}$/, "CEP inválido"),

	nResidencia: z.string().min(1, "Digite o número da sua residência"),

	complemento: z.string().optional(),
});
