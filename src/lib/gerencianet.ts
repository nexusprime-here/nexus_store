"use server";

import path from "path";
import Gerencianet from "gn-api-sdk-typescript";

const certPath =
	process.env.VERCEL_ENV == "production"
		? "/cert/production.p12"
		: "/cert/development.p12";

console.log({
	VERCEL_ENV: process.env.VERCEL_ENV,
	sandbox: process.env.VERCEL_ENV == "development" ? true : false,
	certPath: path.join(process.cwd() + certPath),
});

const gn = new Gerencianet({
	sandbox: process.env.VERCEL_ENV == "development" ? true : false,
	client_id: process.env.EFI_CLIENT_ID as string,
	client_secret: process.env.EFI_SECRET as string,
	certificate: path.join(process.cwd() + certPath),
});

export async function createPix(obj: {
	cpf: string;
	nome: string;
	valor: number;
}) {
	const response = await gn.pixCreateImmediateCharge([], {
		calendario: {
			expiracao: 3600,
		},
		devedor: {
			nome: obj.nome,
			cpf: obj.cpf,
		},
		valor: {
			original: parseFloat(obj.valor as any).toFixed(2),
		},
		chave: process.env.EFI_KEY,
	});

	return {
		txid: response.txid,
		...(await gn.pixGenerateQRCode({ id: response.loc.id })),
	} as PixObj;
}

export type PixObj = {
	imagemQrcode: string;
	linkVisualizacao: string;
	qrcode: string;
	txid: string;
};
