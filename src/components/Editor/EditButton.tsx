import React from 'react';
import { Button } from '../Common/Button';

export const EditButton = ({ onClick }: { onClick?: React.ReactEventHandler; }) => {
	return (
		<div
			className="absolute top-1/2 right-0"
			style={{ transform: 'translateY(-50%)' }}
		>
			<Button name="Edit" color="orange" onClick={onClick} />
		</div>
	);
};
