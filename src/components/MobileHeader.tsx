import Link from 'next/link';
import { IoChatbubbleEllipsesOutline as Icon } from 'react-icons/io5'

function MobileHeader() {
	return (
		<div className="sm:hidden h-20 flex flex-row items-center justify-evenly">
			<p>Nexus Store</p>
			<Link href="/contact" className="flex flex-col items-center justify-center">
				<Icon className="" size={35} />
				<p className="text-current text-[10px]">Fale Conosco</p>
			</Link>
		</div>
	)
}

export default MobileHeader;