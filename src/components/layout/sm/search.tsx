"use client";

import SearchModal from "@components/SearchModal";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

function Search() {
	const [isSearchModalActive, setIsSearchModalActive] = useState(false);

	return (
		<>
			<SearchModal
				active={isSearchModalActive}
				onChange={() => setIsSearchModalActive(false)}
			/>
			<button
				className="flex h-[45px] w-[45px] flex-col items-center justify-center rounded text-[--font-rgb]"
				onClick={() => setIsSearchModalActive((prev) => !prev)}
			>
				<IoSearchOutline size={28} />
			</button>
		</>
	);
}

export default Search;
