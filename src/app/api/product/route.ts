import Product from "@schemas/Product";
import prisma from "@utils/prisma";
import { NextResponse } from "next/server";

const hasAuthorization = (req: Request) => req.headers.get("Authorization") === process.env["ADMIN_TOKEN"];

export async function GET(req: Request) {
	if (!hasAuthorization(req)) {
		return NextResponse.json(null, { status: 401 });
	}

	const { searchParams } = new URL(req.url);
	const productId = searchParams.get("id");

	if (!productId) {
		const allProducts = await prisma.product.findMany();

		return NextResponse.json(allProducts);
	}

	const product = await prisma.product.findUnique({
		where: {
			id: parseInt(productId)
		}
	});

	if (!product) {
		return NextResponse.json({}, { status: 404, statusText: "Product not found" })
	} else {
		return NextResponse.json(product);
	}
}

export async function POST(req: Request) {
	if (!hasAuthorization(req)) {
		return NextResponse.json(null, { status: 401 });
	}

	try {
		const productData = Product.parse(await req.json());

		const product = await prisma.product.create({
			data: {
				name: productData.name,
				description: productData.description,
				iconURL: productData.iconURL,
				price: productData.price,
				collection: productData.collection
			}
		});

		return NextResponse.json({
			id: product.id
		});
	} catch (e: any) {
		return NextResponse.json(JSON.parse(e), { status: 400 });
	}
}

export async function DELETE(req: Request) {
	if (!hasAuthorization(req)) {
		return NextResponse.json(null, { status: 401 });
	}

	const { searchParams } = new URL(req.url);
	const productId = searchParams.get("id");

	if (!productId) {
		return NextResponse.json({}, { status: 404 });
	}

	const deletedProduct = await prisma.product.delete({
		where: {
			id: parseInt(productId)
		}
	});

	return NextResponse.json(deletedProduct);
}

export async function PATCH(req: Request) {
	if (!hasAuthorization(req)) {
		return NextResponse.json(null, { status: 401 });
	}

	const { searchParams } = new URL(req.url);
	const productId = searchParams.get("id");

	if (!productId) {
		return NextResponse.json({}, { status: 404 });
	}

	const body = await req.json();

	const updatedProduct = await prisma.product.update({
		where: {
			id: parseInt(productId)
		},
		data: { ...body }
	});

	return NextResponse.json(updatedProduct);
}