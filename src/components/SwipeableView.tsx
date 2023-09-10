import React, { useRef, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { twMerge } from "tailwind-merge";

interface Props extends React.HTMLProps<SwipeableViews> {
	onDelete: (ref: React.MutableRefObject<SwipeableViews>) => void;
	onEdit: (ref: React.MutableRefObject<SwipeableViews>) => void;
}

const SwipeableView: React.FC<Props> = ({ className, onDelete, onEdit, children }) => {
	const [index, setIndex] = useState(1);
	const viewRef = useRef(null);
	const [deleted, setDeleted] = useState(false);

	const handleChangeIndex = (index: number) => {
		setIndex(index);

		if (index == 0) {
			setTimeout(() => {
				// setDeleted(true);
				onDelete(viewRef as any);
			}, 500)
		}
		else if (index == 2) {
			onEdit(viewRef as any);
		}
	}

	return (
		<SwipeableViews
			ref={viewRef}
			index={index}
			onChangeIndex={handleChangeIndex}
			className={
				twMerge(
					className,
					deleted ? 'hidden' : 'block'
				)
			}
			slideStyle={{
				overscrollBehavior: 'none'
			}}
		>
			<div
				className="h-full flex justify-center items-center bg-red-500 text-lg"
			>
				Excluir
			</div>
			<div>{children}</div>
			{/* <div
				className="w-1/2 flex justify-center items-center bg-blue-500"
			>
				Editar
			</div> */}
		</SwipeableViews>
	);
};

export default SwipeableView;
