import path from 'path';
import Gerencianet from 'gn-api-sdk-typescript';

const gerencianet = new Gerencianet({
	sandbox: false,
	client_id: process.env.EFI_CLIENT_ID as string,
	client_secret: process.env.EFI_SECRET as string,
	certificate: path.resolve(process.cwd() + '/cert/producao.p12'),
});

export default gerencianet;