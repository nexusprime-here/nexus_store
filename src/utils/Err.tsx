import { FieldError } from "react-hook-form";

function Err({ expect, show, field }: { expect?: boolean, show?: string, field?: FieldError }) {
	if (!expect && !show) {
		return <>
			{field && (
				<p>{field.message}</p>
			)}
		</>
	}

	return <>
		{expect && (
			<p>{show}</p>
		)}
	</>
}

export default Err;