import styles from "./page.module.css";
import { CiBitcoin } from 'react-icons/ci'
import { BsX } from 'react-icons/bs'

import Collection from '../components/Collection'

export default async function Home() {
	return (
		<>
			<header className={styles.header}>
				<div style={{ textAlign: "center" }}>
					<h6>Lojinha do</h6>
					<h1>Nexus</h1>
				</div>

				<BsX size={35} />

				<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
					<CiBitcoin size={85} />
				</div>
			</header>

			<div className={styles.content}>
				<p>Seja bem vindo! Entregamos vários tipos de produtos na escola Adventista de Cotia</p>
			</div>

			<Collection name="Mais Vendidos" />
			<Collection name="Mais Vendidos2" />
		</>
	);
}
