import Collection from "@components/Collection";

export default async function Produtos() {
	return (
		<div className="space-y-8">
			<Collection name="Doces" />
			<Collection name="Salgados" />
			<Collection name="Materiais Escolares" />
			<Collection all name="Todos" />
		</div>
	);
}
