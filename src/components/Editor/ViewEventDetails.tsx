import React from 'react';
import dayjs from 'dayjs';
import { EditButton } from './EditButton';
import { Section } from './Section';
import { EventItem } from './EventItem';
import { EventDetailsState } from '../../types';

export interface ViewEventDetails {
    eventDetails: EventDetailsState;
    editClickHandler: React.MouseEventHandler;
}
export const ViewEventDetails = ({
    editClickHandler,
    eventDetails,
}: ViewEventDetails) => {
    const { name, address, city, state } = eventDetails;
    const date = dayjs(eventDetails.dateTime).format('dddd MMMM DD, YYYY');
    const time = dayjs(eventDetails.dateTime).format('HH:mm');
    return (
        <Section title="Event Details">
            <EventItem title="Name" value={name} />
            <EventItem title="Date" value={date} />
            <EventItem title="Time" value={time} />
            <EventItem title="Address" value={address} />
            <EventItem title="City" value={city} />
            <EventItem title="State" value={state} />
            <EditButton onClick={editClickHandler} />
        </Section>
    );
};
