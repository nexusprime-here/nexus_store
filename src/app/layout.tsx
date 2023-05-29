import "../globals.css";
import { Inter } from "next/font/google";

import NavBar from "@components/NavBar";

const inter = Inter({ subsets: ["latin"] });

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
			<body className={inter.className} style={{ transition: '.5s' }} suppressHydrationWarning={true}>
				<div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
					{children}
				</div>
				<NavBar />
			</body>
		</html>
	);
}
