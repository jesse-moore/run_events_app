import React from 'react';

export const Feature = ({
    children,
    index = 0,
}: {
    children: React.ReactNode;
    index?: number;
}) => {
    let rowClassName = '';
    if (index % 2 === 0) {
        rowClassName = 'row-span-2 mt-8 md:my-20';
    } else {
        const rowStart = index + 1;
        rowClassName = `row-span-2 row-start-${rowStart} col-start-2 mt-8 mx-2 md:my-20`;
    }
    return (
        <div className={`${rowClassName} justify-center`}>
            <div className="text-xl text-center p-2">{children}</div>
            <div className="w-350 h-64 mx-auto bg-gray-300"></div>
        </div>
    );
};
