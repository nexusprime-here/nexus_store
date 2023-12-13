import { AiOutlineLoading } from "react-icons/ai";

function Loading({ size = 35 }) {
	return (
		<div className="flex h-full w-full items-center justify-center">
			<AiOutlineLoading className="animate-spin" size={size} />
		</div>
	);
}

export default Loading;
