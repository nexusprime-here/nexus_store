'use server';

import path from "path";
import Gerencianet from "gn-api-sdk-typescript";

const { NODE_ENV, EFI_CLIENT_ID, EFI_SECRET, EFI_KEY } = process.env;

const certPath = path.join(
	process.cwd(),
	"src/static/certificates",
	NODE_ENV == "production"
		? "production.p12"
		: "development.p12"
);

const gn = new Gerencianet({
	sandbox: NODE_ENV == "development",
	client_id: EFI_CLIENT_ID!,
	client_secret: EFI_SECRET!,
	certificate: certPath
});

export async function create(obj: {
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
		chave: EFI_KEY,
	});

	return {
		txid: response.txid,
		...(await gn.pixGenerateQRCode({ id: response.loc.id })),
	} as CreateReturnType;
}

export type CreateReturnType = {
	imagemQrcode: string;
	linkVisualizacao: string;
	qrcode: string;
	txid: string;
};

export async function configWebhook(url: string) {
	return await gn.pixConfigWebhook({ chave: EFI_KEY }, { webhookUrl: url })
}