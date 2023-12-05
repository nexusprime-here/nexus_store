"use client";

import React from "react";
import { FieldError } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import TouchableIcon from "@components/TouchableIcon";

interface Props extends React.HTMLProps<HTMLInputElement> {
	format?: (...args: any) => any;
	label?: string;
	error?: FieldError;
	info?: { title: string; description: string };
}
type Ref = HTMLInputElement;

const Input = React.forwardRef<Ref, Props>(({ format, onChange, value, ...props }, ref) => {
	const [content, setContent] = React.useState(props.defaultValue || "");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setContent(format ? format(e.target.value, content) : e.target.value);

		onChange?.(e);
	};

	return (
		<div>
			<div className="flex flex-row items-center justify-between">
				{!!props.label && <label>{props.label}</label>}

				{!!props.info && <HelpPopover content={props.info} />}
			</div>
			<input
				ref={ref}
				value={content}
				onChange={(e) => handleChange(e)}
				data-error={!!props.error}
				className="border-[1px] data-[error=true]:border-solid data-[error=true]:border-red-500"
				{...props}
			/>
			{!!props.error && <p className="text-red-500 text-xs">{props.error.message}</p>}
		</div>
	);
});

function HelpPopover({ content }) {
	const [open, setOpen] = React.useState(false);

	React.useEffect(() => {
		if (!open) return;

		const timeout = setTimeout(() => setOpen(false), 5000);

		return () => {
			clearTimeout(timeout);
		};
	}, [open]);

	return (
		<Popover onOpenChange={setOpen} open={open}>
			<PopoverTrigger asChild>
				<button>
					<TouchableIcon type="HelpCircle" size={20} className="mx-3" />
				</button>
			</PopoverTrigger>
			<PopoverContent className="mr-5 w-40 border-[rgb(var(--detail-rgb))] bg-[rgb(var(--foreground-rgb))]">
				<h5>{content.title}</h5>
				<p className="text-xs">{content.description}</p>
			</PopoverContent>
		</Popover>
	);
}

Input.displayName = "Input";

export default Input;
