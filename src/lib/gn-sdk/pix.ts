"use server";

import gn from ".";

namespace Pix {
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
			chave: process.env.EFI_KEY,
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
}

export default Pix;
