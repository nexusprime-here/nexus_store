import "../globals.css";
import SearchInput from "@components/Search";
import { CartProvider } from "@root/app/cart/hook";
import * as nav from "@utils/navegation";

export const metadata = {
	title: "Nexus Shop",
	description: "😎",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt-br">
			<body suppressHydrationWarning={true}>
				<CartProvider>
					<MobileHeader />

					<div className="fixed bottom-0 left-0 w-full sm:relative">
						<DesktopNavbar />
						<MobileBottomBar />
					</div>

					<div className="h-screen flex-col items-center mt-16">
						{children}
					</div>
				</CartProvider>
			</body>
		</html>
	);
}

function MobileHeader() {
	return (
		<header className="fixed top-0 w-full h-16 bg-black z-10">
			<div className="sm:hidden static h-16 flex flex-row items-center justify-evenly">
				<p className="text-xl">Nexus Store</p>
				{nav.mobile.header}
			</div>
		</header>
	);
}

function DesktopNavbar() {
	return (
		<header className='box h-20 border-b-[1px] hidden sm:flex flex-row justify-around items-center'>
			<nav className='w-1/3 flex justify-evenly'>
				{nav.desktop}
			</nav>

			<SearchInput />
		</header>
	);
}

function MobileBottomBar() {
	return (
		<nav className='box h-14 border-[1px] m-3.5 py-[5px] rounded-xl sm:hidden flex flex-row justify-around'>
			{nav.mobile.bottom}
		</nav>
	);
}
