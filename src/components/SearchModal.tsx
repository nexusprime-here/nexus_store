"use client";

import React from "react";

function Search({ active = false, onChange = () => {} }) {
	return (
		<div
			data-open={active}
			className="fixed inset-0 left-0 top-0 z-20 hidden h-screen w-screen flex-col items-center bg-[rgba(0,0,0,.3)] backdrop-blur-sm data-[open=true]:flex"
			onClick={onChange}
		>
			<div onClick={(e) => e.stopPropagation()}>
				<p>a</p>

				<input
					type="text"
					className="rounded-full border-solid border-gray-500 focus:border"
				/>
			</div>
		</div>
	);
}

export default Search;
