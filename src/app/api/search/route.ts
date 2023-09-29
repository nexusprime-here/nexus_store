export function GET(req: Request) {
	const { searchParams } = new URL(req.url);

	const query = searchParams.get('q');

	if() {
		return []
	} else {
		return [];
	}
}