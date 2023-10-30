"use server";

import { User } from "@prisma/client";
import { OrderStatus } from "@lib/constants";
import prisma from "@lib/database";

export async function create(order: {
	user: User;
	productsId: { q: number, id: number }[];
	transationId: string;
}) {
	const { user, transationId, productsId } = order;

	const upsertedUser = await prisma.user.upsert({
		create: user,
		update: {},
		where: { CPF: user.CPF },
	})

	return await prisma.order.create({
		data: {
			status: 0,
			user: {
				connect: {
					CPF: upsertedUser.CPF
				},
			},
			transation_id: transationId,
			products: {
				connect: productsId.map(p => ({ id: p.id }))
			},
			p_quantity: JSON.stringify(productsId.reduce((acc, obj) => {
				Object.assign(acc, {[obj.id]: obj.q});
				return acc;
			}, {}))
		},
	});
}

export async function findByUser(
	cpf: number,
	options: { status: OrderStatus[] }
) {
	return await prisma.order.findMany({
		where: {
			status: {
				in: options.status ?? [OrderStatus.CREATED],
			},
			AND: {
				userCPF: cpf,
			},
		},
		include: {
			products: true,
		},
	});
}
