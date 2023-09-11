'use server'

import path from 'path';
import Gerencianet from 'gn-api-sdk-typescript';

const certPath = process.env.NODE_ENV == 'development'
	? '/cert/development.p12'
	: '/cert/producao.p12'

const gn = new Gerencianet({
	sandbox: true,
	client_id: process.env.EFI_CLIENT_ID as string,
	client_secret: process.env.EFI_SECRET as string,
	certificate: path.resolve(process.cwd() + certPath),
});

export async function createPix(obj: { cpf: string, nome: string, valor: number }) {
	const response = await gn.pixCreateImmediateCharge([],
		{
			calendario: {
				expiracao: 3600,
			},
			devedor: {
				nome: obj.nome,
				cpf: obj.cpf
			},
			valor: {
				original: parseFloat(obj.valor as any).toFixed(2)
			},
			chave: process.env.EFI_KEY,
		}
	)

	return <PixObj>gn.pixGenerateQRCode({ id: response.loc.id });
}

export type PixObj = {
	imagemQrcode: string,
	linkVisualizacao: string,
	qrcode: string
}