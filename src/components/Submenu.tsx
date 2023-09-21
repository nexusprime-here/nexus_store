import React, { useState } from "react";

interface Props {
	data: { name: string; component: React.JSX.Element }[];
}

type Ref = HTMLDivElement;

const Submenu = React.forwardRef<Ref, Props>(({ data }, ref) => {
	const [activeButtonIndex, setActiveButtonIndex] = useState(0);

	const handleClick = (index: number) => {
		setActiveButtonIndex(index);
	};

	return (
		<div ref={ref} className="h-screen">
			<div className="flex flex-row w-full">
				{data.map((item, index) => (
					<button
						key={index}
						className="w-full p-[2px] rounded data-[active=true]:bg-white data-[active=true]:text-black"
						data-active={activeButtonIndex === index}
						onClick={() => handleClick(index)}
					>
						{item.name}
					</button>
				))}
			</div>

			<div className="flex-1">
				{data[activeButtonIndex].component}
			</div>
		</div>
	);
});

Submenu.displayName = 'Submenu';

export default Submenu;
