'use server'

import { User } from "@prisma/client"
import { OrderStatus } from "@utils/enums";
import prisma from "@lib/prisma"

export async function create(order: { user: User, productsId: number[], transationId: string }) {
	return await prisma.order.create({
		data: {
			status: 0,
			user: {
				connectOrCreate: {
					create: order.user,
					where: {
						CPF: order.user.CPF
					}
				},
			},
			transation_id: order.transationId,
			products: {
				connect: order.productsId.map(pId => ({ id: pId }))
			}
		}
	});
}

export async function findByUser(cpf: number, options: { status: OrderStatus[] | OrderStatus }) {
	return await prisma.order.findMany({
		where: {
			status: {
				in: options.status ?? OrderStatus.CREATED
			},
			AND: {
				userCPF: cpf
			}
		},
		include: {
			products: true
		}
	})
}