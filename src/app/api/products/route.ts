import prisma from "@root/utils/prisma";
import Products from "@schemas/Product";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const productData = Products.parse(await req.json());

	const product = await prisma.product.create({
		data: {
			name: productData.name,
			description: productData.description,
			iconURL: productData.iconURL,
			price: productData.price,
		}
	})

	return NextResponse.json({
		id: product.id
	})
}

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const productId = searchParams.get('id');

	if (!productId) {
		const allProducts = await prisma.product.findMany()

		return NextResponse.json(allProducts)
	}

	const product = await prisma.product.findUnique({
		where: {
			id: parseInt(productId)
		}
	})

	return NextResponse.json(product);
}

export async function DELETE(req: Request) {
	const { searchParams } = new URL(req.url);
	const productId = searchParams.get('id');

	if (!productId) {
		return NextResponse.error();
	}

	const deletedProduct = await prisma.product.delete({
		where: {
			id: parseInt(productId)
		}
	})

	return NextResponse.json(deletedProduct)
}