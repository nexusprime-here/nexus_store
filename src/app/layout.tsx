import "../globals.css";
import { CartProvider } from "@app/cart/hook";
import Layout from "../layout";

export const metadata = {
	title: "Nexus Shop",
	description: "😎",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="pt-br">
			<body suppressHydrationWarning={true}>
				<CartProvider>
					<Layout>{children}</Layout>
				</CartProvider>
			</body>
		</html>
	);
}
