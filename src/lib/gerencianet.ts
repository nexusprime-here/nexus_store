"use server";

import url from "url";
import path from "path";
import Gerencianet from "gn-api-sdk-typescript";
import { existsSync } from "fs";

const certPath = url.pathToFileURL(
	path.join(
		process.cwd(),
		process.env.VERCEL_ENV == "production"
			? "/cert/production.p12"
			: "/cert/development.p12"
	)
);

console.log({
	VERCEL_ENV: process.env.VERCEL_ENV,
	certPath: certPath,
	exist: existsSync(certPath),
});

const gn = new Gerencianet({
	sandbox: process.env.VERCEL_ENV == "development" ? true : false,
	client_id: process.env.EFI_CLIENT_ID as string,
	client_secret: process.env.EFI_SECRET as string,
	certificate: certPath,
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
