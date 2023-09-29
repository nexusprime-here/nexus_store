import Collection from "../components/Collection";
import Link from "next/link";
import { AiOutlineInstagram as InstagramIcon } from "react-icons/ai";

export default async function Home() {
	// const fetchedCollection = await products.findByCollection("Mais Vendidos");
	// products.findMany({ cache: "reload" });

	return (
		<>
			<main className="mx-10 mb-10 mt-20 font-light">
				<p>Bem vindo ao Nexus Store!</p>
				<p>
					Entregamos doces, salgados e materiais escolares no colégio em horário
					de aula ou de intervalo.
				</p>
				<br />
				<p>
					Você pode entrar em contato conosco clicando no ícone de chat no canto
					superior direito!
				</p>
			</main>

			<Collection name="Mais Vendidos" />

			<Link
				className="mx-10 mt-8 flex items-center justify-center"
				href={"https://www.instagram.com/nexusprime_here/"}
			>
				<InstagramIcon size={30} />
				<p className="ml-1 text-lg font-light underline">nexusprime_here</p>
			</Link>
		</>
	);
}
