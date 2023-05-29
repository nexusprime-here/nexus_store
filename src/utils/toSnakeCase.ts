function toSnakeCase(str: string) {
	const snakeCase = str.replace(/[\W_]+/g, "_");

	return snakeCase.toLowerCase();
}

export default toSnakeCase;
