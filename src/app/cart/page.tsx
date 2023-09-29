"use client";

import Submenu from "../../components/ui/Submenu";
import CartProducts from "./stored/product";
import StatusProducts from "./processed/product";

export default function Cart() {
	return (
		<Submenu
			data={[
				{
					name: "Carrinho",
					component: <CartProducts />,
				},
				{
					name: "Processados",
					component: <StatusProducts />,
				},
			]}
		/>
	);
}
