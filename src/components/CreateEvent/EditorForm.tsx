import React, { ChangeEventHandler } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../lib/redux/reducers';
import { EventInterface } from '../../types';

import { EventDetailsInput } from './EventDetailsInput';
import { ImageInput } from './ImageInput';
import { Input } from './Input';

interface EditorFormProps {
    handleChange: ChangeEventHandler<HTMLInputElement>;
    handleImageInput: any;
    handleEventDetailsInput: any;
}

type State = RootState & { event: EventInterface };

export const EditorForm = ({
    handleChange,
    handleEventDetailsInput,
    handleImageInput,
}: EditorFormProps) => {
    const eventState = useSelector((state: State) => state.event);
    const { date, time, name, address, city, state, heroImg, eventDetails } =
        eventState;

    return (
        <div className="mt-4 w-max mx-auto">
            <form className="p-4">
                <h2>Basic Info</h2>
                <Input
                    name="name"
                    title="Event Name"
                    value={name}
                    handleChange={handleChange}
                />
                <h3>Location</h3>
                <Input
                    name="address"
                    title="Address"
                    value={address}
                    handleChange={handleChange}
                />
                <Input
                    name="city"
                    title="City"
                    value={city}
                    handleChange={handleChange}
                />
                <Input
                    name="state"
                    title="State"
                    value={state}
                    handleChange={handleChange}
                />
                <h3>Date and Time</h3>
                <Input
                    name="date"
                    type="date"
                    title="Date"
                    value={date}
                    handleChange={handleChange}
                />
                <Input
                    name="time"
                    type="time"
                    title="Time"
                    value={time}
                    handleChange={handleChange}
                />
                <h2>Hero Image</h2>
                <ImageInput handleInput={handleImageInput} image={heroImg} />
                <h2>Event Details</h2>
                <EventDetailsInput
                    value={eventDetails}
                    handleChange={handleEventDetailsInput}
                />
            </form>
        </div>
    );
};
