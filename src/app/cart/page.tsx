'use server';

import CartProducts from "./CartProduct";
import StatusProducts from "./StatusProduct";

export default async function Cart() {
	return <>
		<div className="w-full h-10 bg-red-500">
			<button className="flex-1">A</button>
			<button className="flex-1">B</button>
		</div>
	</>
}