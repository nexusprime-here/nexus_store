/* eslint-disable @next/next/no-img-element */
import "./styles.css";
import prisma from "@utils/prisma";
import { notFound } from "next/navigation";
import Actions from "./actions";

export default async function Product({ params }: { params: { id: string } }) {
	const product = await prisma.product.findUnique({
		where: {
			id: parseInt(params.id),
		},
	});

	if (!product) {
		return notFound();
	}

	const formatter = new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	})

	return (
		<div className="safeArea">
			<h3>{product.name}</h3>
			<div className="productImg">
				<img src={product.iconURL} alt="" />
			</div>
			<p>{product.description}</p>
			<div className="priceArea" style={{ width: "100%" }}>
				<h2>{formatter.format(product.price)}</h2>
				<p>Somente pix</p>
			</div>

			<Actions productId={product.id} />
		</div>
	);
}
