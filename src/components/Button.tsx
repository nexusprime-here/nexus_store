import React from 'react';
import { AiOutlineLoading } from 'react-icons/ai';

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	success?: boolean;
	loading?: boolean;
}
type Ref = HTMLButtonElement;

const Button = React.forwardRef<Ref, Props>(({ placeholder, loading, ...props }, ref) => {
	const Loading = () => {
		return <div className='flex items-center justify-center'>
			<AiOutlineLoading
				className="animate-spin"
				size={20}
			/>
		</div>
	}

	return (
		<button
			ref={ref}
			disabled={loading || props.disabled}
			{...props}
		>
			{loading
				? <Loading />
				: placeholder
			}
		</button>
	)
});

Button.displayName = 'Button';

export default Button;