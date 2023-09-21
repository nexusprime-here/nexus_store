import React, { useState } from "react";
import { tv } from "tailwind-variants";

const buttonClass = tv({
	base: "w-full p-[4px] pb-[8px] text-gray-500",
	variants: {
		active: { true: 'text-white border-white border-b-[1px]' }
	}
})

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
						className={buttonClass({ active: activeButtonIndex === index })}
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
