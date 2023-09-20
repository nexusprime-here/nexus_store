import Button from "@components/Button"
import { PixObj } from "@root/lib/gerencianet"
import Image from "next/image"

// BONUS: adicionar timer de contagem de tempo restante para pagamento, e adicionar um recall

function QrCode({ pix }: { pix: PixObj }) {
	const handleOnClick = () => {
		navigator.clipboard.writeText(pix.qrcode)
	}

	return <div className='flex flex-col items-center justify-center space-y-8'>
		<Image
			src={pix.imagemQrcode}
			alt='qrcode'
			height={200}
			width={200}
		/>

		<Button
			placeholder="Copiar chave pix"
			onClick={handleOnClick}
		/>
	</div>
}

export default QrCode;