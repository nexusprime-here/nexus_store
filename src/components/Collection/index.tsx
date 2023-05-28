'use client';

import React from "react";
import "./styles.css";

const Section: React.FC<{ name: string }> = ({ name }) => {
	const rowRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		rowRef.current?.setAttribute('data-after', name)
	}, []);

	return (
		<div ref={rowRef} className="row-overflow">

		</div>
	)
}

export default Section;