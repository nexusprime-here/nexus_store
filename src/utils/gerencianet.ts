import path from 'path';
import Gerencianet from 'gn-api-sdk-typescript';

const gerencianet = new Gerencianet({
	sandbox: false,
	client_id: process.env.EFI_CLIENT_ID as string,
	client_secret: process.env.EFI_SECRET as string,
	certificate: path.resolve(process.cwd() + '/cert/producao.p12'),
});

export async function createPix(devedor: { cpf: string, nome: string }, valor: string) {
	const response = await gerencianet.pixCreateImmediateCharge([],
		{
			calendario: {
				expiracao: 3600,
			},
			chave: process.env.EFI_KEY,
			devedor: devedor,
			valor: {
				original: valor
			}
		}
	)

	return gerencianet.pixGenerateQRCode({ id: response.loc.id });
}

export default gerencianet;