import React from 'react';
import { FieldError } from 'react-hook-form';

interface Props extends React.HTMLProps<HTMLInputElement> {
	format?: (...args: any) => any;
	label?: string;
	error?: FieldError;
}
type Ref = HTMLInputElement;

const Input = React.forwardRef<Ref, Props>(({ format, onChange, value, ...props }, ref) => {
	const [content, setContent] = React.useState(props.defaultValue);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setContent(format
			? format(e.target.value, content)
			: e.target.value
		);

		// onChange?.(e);
	}

	return (
		<div>
			{!!props.label && <label>{props.label}</label>}
			<input
				ref={ref}
				value={content}
				onChange={e => handleChange(e)}
				{...props}
			/>
			{!!props.error && <p>{props.error.message}</p>}
		</div>
	)
})

export default Input;