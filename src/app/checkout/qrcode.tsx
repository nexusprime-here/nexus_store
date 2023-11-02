import Button from "@components/ui/Button";
import * as Pix from "@lib/gn-sdk";
import Image from "next/image";

// BONUS: adicionar timer de contagem de tempo restante para pagamento, e adicionar um recall

function QrCode(options: { pix: Pix.CreateReturnType }) {
	const pix = { ...options.pix }

	const handleOnClick = () => {
		navigator.clipboard.writeText(pix.qrcode);
	};

	return (
		<div className="flex flex-col items-center justify-center space-y-8">
			<Image src={pix.imagemQrcode} alt="qrcode" height={200} width={200} />

			<Button placeholder="Copiar chave pix" onClick={handleOnClick} />
		</div>
	);
}

export default QrCode;
