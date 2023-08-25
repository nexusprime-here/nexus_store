import * as nav from "@root/navegation";
import "../globals.css";
import { Inter } from "next/font/google";
import SearchInput from "@components/Search";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Nexus Shop",
	description: "😎",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang="pt-br">
			<body className={inter.className} suppressHydrationWarning={true}>
				<MobileHeader />

				<div className="fixed bottom-0 left-0 w-full sm:relative">
					<DesktopNavbar />
					<MobileBottomBar />
				</div>

				<div className="h-screen flex-col items-center">
					{children}
				</div>
			</body>
		</html >
	);
}

function MobileHeader () {
	return (
		<div className="sm:hidden h-16 flex flex-row items-center justify-evenly ">
			<p className="text-xl">Nexus Store</p>
			{nav.mobile.header}
		</div>
	)
}

function DesktopNavbar() {
	return (
		<div className='box h-20 border-b-[1px] hidden sm:flex flex-row justify-around items-center'>
			<div className='w-1/3 flex justify-evenly'>
				{nav.desktop}
			</div>

			<SearchInput />
		</div>
	)
}

function MobileBottomBar() {
	return (
		<div className='box h-14 border-[1px] m-3.5 py-[5px] rounded-xl sm:hidden flex flex-row justify-around'>
			{nav.mobile.bottom}
		</div>		
	)
}