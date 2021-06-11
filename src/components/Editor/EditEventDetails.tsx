import React, { FormEvent, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Button } from '../Common/Button';
import { DiscardModal } from './DiscardModal';
import { Input } from '../Form/Input';
import { EventDetailsState } from '../../types';
import {
    useSaveEventDetailsMutation,
    useCheckSubdomainLazyQuery,
} from '../../lib/generated/graphql-frontend';
import { URLInput } from '../Form/URLInput';
import { convertToURL } from '../../lib/utils/convertToURL';

interface EditEventDetailsProps {
    eventDetails: EventDetailsState;
    submitHandler: () => void;
    cancelHandler: () => void;
}

interface EventState {
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    dateTime: any;
    date: string;
    time: string;
    slug: string;
}

interface Errors {
    name?: string;
    address?: string;
    city?: string;
    state?: string;
    date?: string;
    time?: string;
    slug?: string;
}

export const EditEventDetails = ({
    eventDetails,
    submitHandler,
    cancelHandler,
}: EditEventDetailsProps) => {
    const [saveEventDetails] = useSaveEventDetailsMutation();
    const [checkSubdomain, { data: subdomainData }] =
        useCheckSubdomainLazyQuery();
    const [formState, setFormState] = useState<EventState>();
    const [errors, setErrors] = useState<Errors>({});
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

    useEffect(() => {
        if (!subdomainData || !formState) return;
        const { checkSubdomain } = subdomainData;
        if (!checkSubdomain) {
            setErrors((errors) => {
                return { ...errors, slug: '' };
            });
        } else {
            setErrors((errors) => {
                return {
                    ...errors,
                    slug: `Subdomain already in use "${formState.slug}"`,
                };
            });
        }
    }, [subdomainData]);

    const handleCheckSubdomain = async () => {
        if (!formState) return;
        const { slug } = formState;
        if (!slug) {
            setErrors((errors) => {
                return { ...errors, slug: 'Subdomain is required' };
            });
        } else if (formState.slug === eventDetails.slug) {
            setErrors((errors) => {
                return { ...errors, slug: '' };
            });
        } else {
            checkSubdomain({
                variables: {
                    subdomain: slug,
                },
            });
        }
    };

    const handleChange = ({ target }: { target: HTMLInputElement }) => {
        if (!formState) return;
        const { name, value } = target;
        if (name === 'slug') {
            const url = convertToURL(value);
            setFormState({ ...formState, slug: url });
        } else {
            setFormState({ ...formState, [name]: value });
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formState) return;
        const dateString = dayjs(
            `${formState.date} ${formState.time}`
        ).toISOString();

        const dateTime = dateString !== 'Invalid Date' ? dateString : '';
        const { date, time, ...formChanges } = formState;
        formChanges.dateTime = dateTime;
        const res = await saveEventDetails({
            variables: { eventDetails: formChanges },
        });
        if (res.data) {
            submitHandler();
        } else {
            // TODO Handle Error
        }
    };

    if (!formState) return null;
    const { name, address, city, state, time, date, slug } = formState;
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Input
                    name="name"
                    title="Event Name"
                    value={name}
                    handleChange={handleChange}
                    required
                />
                <URLInput
                    required={true}
                    name="slug"
                    title="Page URL"
                    value={slug}
                    error={errors.slug}
                    handleChange={handleChange}
                    handleBlur={handleCheckSubdomain}
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
