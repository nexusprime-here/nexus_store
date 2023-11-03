import Button from "@components/ui/Button";
import Input from "@components/ui/Input";

export default function Lovemail() {
	return (
		<div>
			<span>Deixe esse vazio para enviar anonimo</span>
			<Input 
				placeholder="De:" 
			/>
			<Input 
				placeholder="Para:" 
			/>

			<Button
				placeholder="Enviar por R$ 3.50"
			/>
		</div>
	)
}