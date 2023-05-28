/* eslint-disable @next/next/no-img-element */
import s from './page.module.css'

export default async function Product({ params }: { params: { id: string } }) {
	const request = await fetch(`http://localhost:3000/api/products?id=${params.id}`, {
		method: "GET",
	})

	if (!request.ok) {
		throw request.status;
	}

	const product = await request.json()
	const formatter = new Intl.NumberFormat("pt-BR", {
		style: 'currency',
		currency: 'BRL'
	});

	return (
		<div className={s.safeArea}>
			<h3>{product.name}</h3>
			<div className={s.productImg}>
				<img src={product.iconURL} alt="" />
			</div>
			<p>{product.description}</p>
			<div className={s.priceArea} style={{ width: "100%" }}>
				<h2>{formatter.format(product.price)}</h2>
				<p>Somente pix</p>
			</div>
			<button>Comprar</button>
		</div>
	)
} 