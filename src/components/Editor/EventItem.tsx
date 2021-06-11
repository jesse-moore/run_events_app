import React from 'react';

export interface EventItem {
    title: string;
    value: string | number;
}

export const EventItem = ({ title, value }: EventItem) => {
    return (
        <div className="grid grid-cols-12 items-center my-2">
            <div className="col-span-3 text-lg font-medium">{title}:</div>
            <div className="col-span-9">{value}</div>
        </div>
    );
};
