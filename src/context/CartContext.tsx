"use client";

import { useRouter } from "next/navigation";
import { createContext, useState, useEffect, ReactNode, useContext } from "react";

export interface CartItem {
	productId: number;
	quantity: number;
}

interface CartContextType {
	cart: CartItem[];
	addItemToCart: (item: CartItem) => void;
	deleteItemFromCart: (productId: number) => void;
}

const CartContext = createContext<CartContextType | CartContextType>({  // Defina um valor padrão aqui
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
			(cartItem) => cartItem.productId === item.productId
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
		const newCartItems = cart.filter((cartItem) => cartItem.productId !== productId);

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