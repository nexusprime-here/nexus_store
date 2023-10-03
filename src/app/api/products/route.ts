import Product from "@app/products/schema";
import prisma from "@lib/database";
import { toSnakeCase } from "@lib/utils";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

const hasAuthorization = (req: Request) =>
	req.headers.get("Authorization") === process.env["ADMIN_TOKEN"];

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const productId = searchParams.get("id");
	const include = searchParams.get("include")?.split(",");

	const queryInclude = {
		include: {
			collections: include?.includes("collections") ?? false,
			orders: include?.includes("orders") ?? false,
		},
	};

	if (!productId) {
		const allProducts = await prisma.product.findMany(queryInclude);

		return NextResponse.json(allProducts);
	}

	const product = await prisma.product.findUnique({
		where: {
			id: parseInt(productId),
		},
		...queryInclude,
	});

	if (!product) {
		return NextResponse.json(
			{},
			{ status: 404, statusText: "Product not found" }
		);
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

		const iconResponse = await fetch(productData.iconURL);
		const icon = Buffer.from(await iconResponse.arrayBuffer()).toString(
			"base64"
		);

		const product = await prisma.product.create({
			data: {
				name: productData.name,
				description: productData.description,
				icon,
				price: productData.price,
				collections: {
					connectOrCreate: productData.collections.map((c) => ({
						where: {
							id: toSnakeCase(c),
						},
						create: {
							id: toSnakeCase(c),
							name: c,
						},
					})),
				},
			},
		});

		revalidateTag("collection");

		return NextResponse.json({
			id: product.id,
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
			id: parseInt(productId),
		},
	});

	revalidateTag("collection");

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

	const { iconURL, ...body } = await req.json();

	let icon: string | undefined;

	if (iconURL) {
		const iconResponse = await fetch(iconURL);
		icon = Buffer.from(await iconResponse.arrayBuffer()).toString("base64");
	}

	const updatedProduct = await prisma.product.update({
		where: {
			id: parseInt(productId),
		},
		data: { icon, ...body },
	});

	revalidateTag("collection");

	return NextResponse.json(updatedProduct);
}
