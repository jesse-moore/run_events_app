import React from 'react';

interface EventList {
    children: React.ReactNode;
}

export const EventList = ({ children }: EventList) => {
    return (
        <div className="relative mx-auto flex flex-col max-w-4xl">
            {children}
        </div>
    );
};
