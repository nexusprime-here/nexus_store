import Loading from '@components/Loading';
import Link from 'next/link';
import React from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
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
		},
		success: {
			true: "bg-green-500"
		}
	}
})

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	success?: boolean;
	loading?: boolean;
	link?: string;
}
type Ref = HTMLButtonElement;

const Button = React.forwardRef<Ref, Props>(({ placeholder, link, className, ...props }, ref) => {
	const btn = (
		<button
			{...props}
			ref={ref}
			disabled={props.success || props.loading || props.disabled}
			className={twMerge(
				button({ disabled: props.disabled, success: props.success }),
				className
			)}
		>
			{props.loading
				? <Loading size={28} />
				: props.success
					? <div className='w-full flex items-center justify-center'>
						<AiOutlineCheckCircle size={28} color='white'/>
					</div>
					: placeholder
			}
		</button>
	);

	return link
		? <Link href={link}>{btn}</Link>
		: btn
});

Button.displayName = 'Button';

export default Button;