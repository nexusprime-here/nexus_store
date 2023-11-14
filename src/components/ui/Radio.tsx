"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { GiPlainCircle as Circle } from "react-icons/gi";

import { cn } from "@lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  { label: string } & React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
	<RadioGroupPrimitive.Item
		ref={ref}
		className="flex flex-row items-center space-x-2"
		{...props}
	>
		<div className={cn(
			"aspect-square h-4 w-4 rounded-full border border-primary flex items-center justify-center text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
			className
		)}>
			<RadioGroupPrimitive.Indicator className="flex items-center justify-center">
				<Circle className="h-2.5 w-2.5 fill-current text-current" />
			</RadioGroupPrimitive.Indicator>
		</div>

		<p>{props.label}</p>
	</RadioGroupPrimitive.Item>

  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
