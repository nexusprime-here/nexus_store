import { z } from "zod";

export default z.object({
	name: z.string(),
	description: z.string(),
	price: z.number(),
	iconURL: z.string().url(),
	collection: z.string().optional(),
});
