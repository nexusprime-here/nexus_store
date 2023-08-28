"use client";

import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import { createContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
	product: Omit<Product, 'collection'>;
	quantity: number;
}

interface CartContextType {
	cart: CartItem[];
	addItemToCart: (item: CartItem) => void;
	deleteItemFromCart: (productId: number) => void;
}

const CartContext = createContext<CartContextType>({  // Defina um valor padrão aqui
	cart: [],
	addItemToCart: () => { },
	deleteItemFromCart: () => { },
});

interface CartProviderProps {
	children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
	const [cart, setCart] = useState<CartItem[]>([]);

	const router = useRouter();

	useEffect(() => {
		if (typeof window == 'undefined') {
			return;
		}

		setCartToState();
	}, []);

	const setCartToState = () => {
		setCart(
			localStorage.getItem("cart")
				? JSON.parse(localStorage.getItem("cart")!)
				: []
		);
	};

	const addItemToCart = (item: CartItem) => {
		const existingItemIndex = cart.findIndex(
			(cartItem) => cartItem.product.id === item.product.id
		);

		let newCartItems: CartItem[];

		if (existingItemIndex !== -1) {
			newCartItems = [...cart];
			newCartItems[existingItemIndex].quantity += item.quantity;
		} else {
			newCartItems = [...cart, item];
		}

		localStorage.setItem("cart", JSON.stringify(newCartItems));
		setCartToState();
	};

	const deleteItemFromCart = (productId: number) => {
		const newCartItems = cart.filter((cartItem) => cartItem.product.id !== productId);

		localStorage.setItem("cart", JSON.stringify(newCartItems));
		setCartToState();
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				addItemToCart,
				deleteItemFromCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartContext;