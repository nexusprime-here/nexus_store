import React, { useState } from "react";
import { tv } from "tailwind-variants";

const buttonClass = tv({
	base: "transition w-full p-[4px] pb-[8px] text-gray-500 py-2",
	variants: {
		active: { true: "text-white border-white border-b-2" },
	},
});

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
			<div className="flex w-full flex-row">
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

			<div className="flex-1">{data[activeButtonIndex].component}</div>
		</div>
	);
});

Submenu.displayName = "Submenu";

export default Submenu;
