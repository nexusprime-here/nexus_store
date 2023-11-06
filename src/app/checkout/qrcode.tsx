'use client';

import Button from "@components/ui/Button";
import * as Pix from "@lib/gn-sdk";
import Image from "next/image";
import React from "react";

// BONUS: adicionar timer de contagem de tempo restante para pagamento, e adicionar um recall

function QrCode(options: { pix: Pix.CreateReturnType }) {
	const [success, setSuccess] = React.useState(false);

	const pix = { ...options.pix }

	const handleOnClick = () => {
		navigator.clipboard.writeText(pix.qrcode);

		setSuccess(true);
	};

	return (
		<div className="flex flex-col items-center justify-center space-y-8">
			<Image src={pix.imagemQrcode} alt="qrcode" height={200} width={200} />

			<Button  
				success={success}
				placeholder="Copiar chave pix" onClick={handleOnClick} 
			/>
		</div>
	);
}

export default QrCode;
