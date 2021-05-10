import React from 'react';

export const InputMessage = ({
    children,
    type,
}: {
    children: JSX.Element | string | null;
    type: string;
}) => {
    switch (type) {
        case 'error':
            return <div className="text-xs text-red-600">{children}</div>;
        case 'info':
            return <div className="text-xs text-gray-600">{children}</div>;
        default:
            return <div className="text-xs text-gray-600">{children}</div>;
    }
};
