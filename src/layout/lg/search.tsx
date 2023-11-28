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

			<IoSearchOutline
				size={22}
				className="hover:cursor-pointer"
				onClick={() => setIsSearchModalActive((prev) => !prev)}
			/>
		</>
	);
}

export default Search;
