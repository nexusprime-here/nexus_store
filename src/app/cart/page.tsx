'use client';

import Submenu from "@root/components/Submenu";
import CartProducts from "./CartProduct";
import StatusProducts from "./StatusProduct";

export default function Cart() {
	return (
		<Submenu data={[
			{
				name: "Carrinho",
				component: <CartProducts />
			},
			{
				name: "Processados",
				component: <StatusProducts />
			}
		]} />
	)
}