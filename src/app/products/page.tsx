import Collection from "@components/Collection";

export default async function Produtos() {
	return (
		<div className="pb-4 space-y-8">
			<Collection name="Mais Vendidos" />
			<Collection name="Novos" />
			<Collection name="Todos" all />
		</div>
	)
}