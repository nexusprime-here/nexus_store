"use client";

import React from "react";

function Search({ mobile }: { mobile?: boolean }) {
	const [focus, setFocus] = React.useState(false);
	const inputRef = React.useRef<HTMLInputElement>(null);

	const handleFocus = () => {
		setFocus(true);
	};
	const handleBlur = () => {
		setFocus(false);
	};

	React.useEffect(() => {
		if (focus) {
			inputRef.current?.focus();
		}
	}, [focus]);

	const input = (
		<input
			id="search"
			className={`
				${focus ? "w-full " : "h-7 w-1/3"}
				rounded-full bg-[rgba(var(--font-rgb),0.4)] pl-7 text-xs placeholder:text-black
			`}
			placeholder="Buscar Página / Produto"
			onFocus={handleFocus}
			onBlur={handleBlur}
			ref={inputRef}
		/>
	);

	return focus ? (
		<div className="absolute left-0 top-0 flex h-screen w-screen items-center justify-center bg-black/30 backdrop-blur-sm">
			<div className="flex h-[50vh] w-[40vw] flex-col items-center bg-black p-10">
				{input}
			</div>
		</div>
	) : mobile ? (
		<></>
	) : (
		input
	);
}

export default Search;
