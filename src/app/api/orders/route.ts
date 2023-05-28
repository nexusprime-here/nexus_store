import Order from "@schemas/Order";

export async function POST(req: Request) {
	// const order = Order.parse(await req.json())

	return new Response('tnks!')
}
