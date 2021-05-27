import React from 'react';
import { EditButton } from './EditButton';
import { EventItem } from './EventItem';

export const EventRace = () => {
    return (
        <div className="relative bg-gray-100 rounded p-4 my-4 mx-4">
            <EventItem title="Name" value="5k" />
            <EventItem title="Distance" value="5km / 3.1 Miles" />
            <EditButton />
        </div>
    );
};
