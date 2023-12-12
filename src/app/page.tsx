import Collection from "@components/Collection";
import Link from "next/link";
import { AiOutlineInstagram as InstagramIcon } from "react-icons/ai";

export default async function Home() {
	return (
		<>
			<main className="mx-10 mb-10 font-light">
				<p>Bem vindo ao Nexus Store!</p>
				<br />
				<p>Você pode entrar em contato conosco clicando no ícone de chat no canto superior direito!</p>
			</main>

			<Collection name="Mais Vendidos" />

			<Link className="mx-10 mt-8 flex items-center justify-center" href={"https://www.instagram.com/my_nexus_store/"}>
				<InstagramIcon size={30} />
				<p className="ml-1 text-lg font-light underline">my_nexus_store</p>
			</Link>
		</>
	);
}
