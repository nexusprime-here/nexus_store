import "../globals.css";
import { CartProvider } from "@app/cart/hook";
import Layout from "../layout";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Nexus Store",
	description: "😎",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt-br">
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
			</head>
			<body suppressHydrationWarning={true}>
				<CartProvider>
					<Layout>{children}</Layout>
				</CartProvider>
			</body>
		</html>
	);
}
