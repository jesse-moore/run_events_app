import React from 'react';

export interface Section {
	children: React.ReactNode;
	title: string;
}
export const Section = ({ children, title }: Section) => {
	return (
		<div className="relative bg-gray-100 rounded px-4 py-2 my-8 mx-4">
			<h3 className="text-xl text-center font-medium">{title}</h3>
			{children}
		</div>
	);
};
