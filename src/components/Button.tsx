import Link from 'next/link';
import React from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';

const button = tv({
	base: 'w-[70%] h-10 text-sm rounded border-none text-[rgb(var(--background-end-rgb))] bg-[rgb(var(--font-rgb))]',
	variants: {
		disabled: {
			true: 'pointer-events-none bg-[rgba(var(--font-rgb),0.4)]'
		},
		active: {
			true: 'bg-[rgb(var(--background-end-rgb))] border-solid border-[1px] border-[rgb(var(--background-end-rgb))] text-[rgb(var(--foreground-rgb))]'
		}
	}
})

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	success?: boolean;
	loading?: boolean;
	link?: string;
}
type Ref = HTMLButtonElement;

const Button = React.forwardRef<Ref, Props>(({ placeholder, loading, link, className, ...props }, ref) => {
	const Loading = () => {
		return <div className='flex items-center justify-center'>
			<AiOutlineLoading
				className="animate-spin"
				size={20}
			/>
		</div>
	}

	const Element = (args: any) => {
		return link
			? <Link {...args} />
			: <button {...args} />
	}

	return (
		<Element
			{...props}
			ref={ref}
			disabled={loading || props.disabled}
			className={twMerge(
				button({ disabled: props.disabled }),
				className
			)}
		>
			{loading
				? <Loading />
				: placeholder
			}
		</Element>
	)
});

Button.displayName = 'Button';

export default Button;