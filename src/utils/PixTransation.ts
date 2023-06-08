import gerencianet from "@utils/gerencianet"

class PixTransation {
	charge: any;

	async createCharge(devedor: { cpf: string, nome: string }, valor: string) {
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

		this.charge = response;
		return response;
	}

	getQrCode() {
		return gerencianet.pixGenerateQRCode({ id: this.charge.response.loc.id })
	}
}

export default PixTransation