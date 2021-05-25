import { MouseEventHandler } from 'react';

interface ButtonInterface {
    name: string;
    onClick?: MouseEventHandler;
    isActive?: boolean;
}

export const Button = ({ isActive, name, onClick }: ButtonInterface) => {
    const bgColor = isActive ? 'bg-blue-400' : 'bg-blueGray-300';
    return (
        <button
            className={`${bgColor} transition-colors duration-200 px-5 py-2 rounded-md mx-4 font-medium text-base hover:bg-blue-400 focus:outline-none`}
            onClick={onClick}
        >
            {name}
        </button>
    );
};
