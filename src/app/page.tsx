import styles from "./page.module.css";
import { CiBitcoin } from "react-icons/ci";
import { BsX } from "react-icons/bs";

import Collection from "@components/Collection";
import prisma from "@utils/prisma";

export default async function Home() {
	const products = await prisma.product.findMany({
		where: {
			collection: "mais_vendidos",
		},
	});

	return (
		<>
			<header className={styles.header}>
				<div style={{ textAlign: "center" }}>
					<h6>Lojinha do</h6>
					<h1>Nexus</h1>
				</div>

				<BsX size={35} />

				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<CiBitcoin size={85} />
				</div>
			</header>

			<div className={styles.content}>
				<p>Seja bem vindo!</p>
				<p>
					Entregamos vários tipos de produtos na escola Adventista de Cotia,
					você pode comprar em qualquer horário e receber na semana das 6:45 à
					13:20
				</p>
			</div>

			<Collection name="Mais Vendidos" items={products} />
		</>
	);
}
