import { z } from "zod";

export default z.object({
	address: z.object({
		ano: z
			.number()
			.int()
			.min(1)
			.max(9),

		fund: z
			.number()
			.int()
			.min(1)
			.max(3),

		alpha: z
			.string()
			.length(1)
	}),
	productId: z.string(),
	quantity: z.number().int()
});
