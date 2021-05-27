import React, { FormEvent, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Button } from '../Common/Button';
import { DateInput } from '../Form/DateInput';
import { TextInput } from '../Form/TextInput';
import { DiscardModal } from './DiscardModal';
import { Input } from '../Form/Input';
import { EventDetailsState } from '../../types';

interface EditEventDetailsProps {
    eventDetails: EventDetailsState;
    submitHandler: (eventDetails: any) => void;
    cancelHandler: () => void;
}

interface EventState {
    name: string;
    address: string;
    city: string;
    state: string;
    dateTime: any;
    date: string;
    time: string;
}

export const EditEventDetails = ({
    eventDetails,
    submitHandler,
    cancelHandler,
}: EditEventDetailsProps) => {
    const [formState, setFormState] = useState<EventState>();
    const [discardWarning, setDiscardWarning] = useState(false);

    useEffect(() => {
        const initialEventState: EventState = {
            ...eventDetails,
            date: '',
            time: '',
        };
        const date = dayjs(eventDetails.dateTime).format('YYYY-MM-DD');
        const time = dayjs(eventDetails.dateTime).format('HH:mm');
        if (date !== 'Invalid Date') initialEventState.date = date;
        if (time !== 'Invalid Date') initialEventState.time = time;
        setFormState(initialEventState);
    }, []);

    const handleChange = ({ target }: { target: HTMLInputElement }) => {
        if (!formState) return;
        const { name, value } = target;
        setFormState({ ...formState, [name]: value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formState) return;
        const dateString = dayjs(
            `${formState.date} ${formState.time}`
        ).toISOString();

        const dateTime = dateString !== 'Invalid Date' ? dateString : '';
        const { date, time, ...formChanges } = formState;
        formChanges.dateTime = dateTime;
        submitHandler(formChanges);
    };

    if (!formState) return null;
    const { name, address, city, state, time, date } = formState;
    return (
        <>
            <div className="bg-gray-100 rounded px-4 py-2 my-8 mx-4">
                <form onSubmit={handleSubmit}>
                    <Input
                        name="name"
                        title="Event Name"
                        value={name}
                        handleChange={handleChange}
                        required
                    />
                    <h3>Location</h3>
                    <Input
                        name="address"
                        title="Address"
                        value={address}
                        handleChange={handleChange}
                        required
                    />
                    <Input
                        name="city"
                        title="City"
                        value={city}
                        handleChange={handleChange}
                        required
                    />
                    <Input
                        name="state"
                        title="State"
                        value={state}
                        handleChange={handleChange}
                        required
                    />
                    <h3>Date and Time</h3>
                    <Input
                        name="date"
                        type="date"
                        title="Date"
                        value={date}
                        handleChange={handleChange}
                        required
                    />
                    <Input
                        name="time"
                        type="time"
                        title="Time"
                        value={time}
                        handleChange={handleChange}
                        required
                    />
                    <div className="flex flex-row justify-end -mr-4 py-2">
                        <Button
                            name="Discard Changes"
                            color="red"
                            onClick={() => setDiscardWarning(true)}
                            type="button"
                        />
                        <Button name="Save" color="green" type="submit" />
                    </div>
                </form>
            </div>
            {discardWarning && (
                <DiscardModal
                    title="Discard Changes to Event Details?"
                    closeHandler={() => setDiscardWarning(false)}
                    confirmHandler={cancelHandler}
                />
            )}
        </>
    );
};
