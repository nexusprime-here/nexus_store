import "../globals.css";

import { Inter } from "next/font/google";
import Navegator from "@root/components/Navegator";
import MobileHeader from "@components/MobileHeader";

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
			<body className={inter.className} suppressHydrationWarning={true}>
				<MobileHeader />
				<Navegator />

				<div className="h-screen flex-col items-center">
					{children}
				</div>
			</body>
		</html>
	);
}
