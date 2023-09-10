'use client';

import React from 'react';

function SearchInput({ mobile }: { mobile?: boolean }) {
	const [focus, setFocus] = React.useState(false);
	const inputRef = React.useRef<HTMLInputElement>(null);

	const handleFocus = () => {
		setFocus(true)
	}
	const handleBlur = () => {
		setFocus(false)
	}

	React.useEffect(() => {
		if (focus) {
			inputRef.current?.focus();
		}
	}, [focus]);

	const input = (
		<input
			id='search'
			className={`
				${focus
					? 'w-full '
					: 'w-1/3 h-7'
				}
				bg-[rgba(var(--font-rgb),0.4)] placeholder:text-black rounded-full text-xs pl-7
			`}
			placeholder="Buscar Página / Produto"
			onFocus={handleFocus}
			onBlur={handleBlur}
			ref={inputRef}
		/>
	)

	return focus
		? <div className='absolute top-0 left-0 h-screen w-screen bg-black/30 backdrop-blur-sm flex items-center justify-center'>
			<div className='bg-black h-[50vh] w-[40vw] flex flex-col items-center p-10'>
				{input}
			</div>
		</div>
		: mobile
			? <></>
			: input
}

export default SearchInput;