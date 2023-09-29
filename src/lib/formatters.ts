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
			}
		);

		return value;
	},

	ano(value: string) {
		return value[0]?.replace(/[a-zA-ZÀ-ÿ.,;!?'"()\[\]\{\}]/g, "");
	},

	fund(value: string) {
		return value[0]?.replace(/[[a-zA-ZÀ-ÿ.,;!?'"()\[\]\{\}]/g, "");
	},

	sala(value: string) {
		return value[0]?.toUpperCase().replace(/[À-ÿ0-9.,;!?'"()\[\]\{\}]/g, "");
	},
};

export default format;
