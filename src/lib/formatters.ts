const format = {
	brl(value: number) {
		return new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(value);
	},

	cpf(value: string) {
		value = value.replace(/\D/g, "");

		if (value.length > 11) {
			value = value.substring(0, 11);
		}

		value = value.replace(
			/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/,
			function (match, g1, g2, g3, g4) {
				var result =
					(g1 || "") +
					(g2 ? "." + g2 : "") +
					(g3 ? "." + g3 : "") +
					(g4 ? "-" + g4 : "");
				return result;
			},
		);

		return value;
	},

	cep(value: string) {
		const numericValue = value.replace(/\D/g, "");

		if (numericValue.length <= 5) {
			return numericValue;
		} else if (numericValue.length <= 8) {
			return `${numericValue.slice(0, 5)}-${numericValue.slice(5)}`;
		} else {
			return `${numericValue.slice(0, 5)}-${numericValue.slice(5, 8)}`;
		}
	},

	nResidencia(value: string) {
		return value?.replace(/[[a-zA-ZÀ-ÿ.,;!?'"()\[\]\{\}]/g, "").slice(0, 5);
	},
};

export default format;
