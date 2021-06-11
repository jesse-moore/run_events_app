import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    useCreateEventMutation,
    useCheckSubdomainLazyQuery,
} from '../../lib/generated/graphql-frontend';
import { RootState } from '../../lib/redux/reducers';
import { actions } from '../../lib/redux/reducers/eventEditor';
import { convertToURL } from '../../lib/utils/convertToURL';
import { imageToDataURL } from '../../lib/utils';
import { EventInterface } from '../../types';

import { EventDetailsInput } from './EventDetailsInput';
import { ImageInput } from './ImageInput';
import { Input } from '../Form/Input';
import { URLInput } from '../Form/URLInput';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

type State = RootState & { event: EventInterface };

export const EditorForm = () => {
    const dispatch = useDispatch();
    const eventState = useSelector((state: State) => state.event);
    const [imageFile, setImageFile] = useState<File>();
    const [checkSubdomain, { data: subdomainData }] =
        useCheckSubdomainLazyQuery();
    const [createEvent] = useCreateEventMutation();
    const router = useRouter();
    const {
        date,
        time,
        name,
        address,
        city,
        state,
        heroImg,
        eventDetails,
        slug,
        errors,
    } = eventState;

    useEffect(() => {
        if (!subdomainData) return;
        const { checkSubdomain } = subdomainData;
        if (!checkSubdomain) {
            dispatch(actions.updateSlugError(''));
        } else {
            dispatch(
                actions.updateSlugError(`Subdomain already in use "${slug}"`)
            );
        }
    }, [subdomainData]);

    const handleChange = ({ target }: { target: HTMLInputElement }) => {
        const { name, value } = target;
        switch (name) {
            case 'name':
                dispatch(actions.updateName(value));
                break;
            case 'slug':
                const url = convertToURL(value);
                dispatch(actions.updateSlug(url));
                break;
            case 'address':
                dispatch(actions.updateAddress(value));
                break;
            case 'city':
                dispatch(actions.updateCity(value));
                break;
            case 'state':
                dispatch(actions.updateState(value));
                break;
            case 'date':
                dispatch(actions.updateDate(value));
                break;
            case 'time':
                dispatch(actions.updateTime(value));
                break;
            default:
                break;
        }
    };

    const handleEventDetailsInput = (value: string) => {
        dispatch(actions.updateEventDetails(value));
    };

    const handleImageInput = async ({
        target,
    }: {
        target: HTMLInputElement;
    }) => {
        const { files } = target;
        if (files) {
            try {
                const image = await imageToDataURL(files[0]);
                const { name, size } = files[0];
                const heroImg = {
                    name,
                    size,
                    dataURL: image,
                    src: null,
                    error: null,
                };
                dispatch(actions.updateHeroImg(heroImg));
                setImageFile(files[0]);
            } catch ({ error }) {}
        }
    };

    const handleCheckSubdomain = async () => {
        checkSubdomain({
            variables: {
                subdomain: slug,
            },
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const dateString = dayjs(
            `${eventState.date} ${eventState.time}`
        ).toISOString();

        const dateTime = dateString !== 'Invalid Date' ? dateString : '';
        const newEvent = {
            address,
            city,
            state,
            eventDetails,
            name,
            dateTime,
            heroImg: imageFile,
            slug,
        };
        await createEvent({ variables: { event: newEvent } });
        router.push('/app');
    };

    return (
        <div className="mt-4 w-max mx-auto">
            <form className="p-4" id="eventForm" onSubmit={handleSubmit}>
                <h2>Basic Info</h2>
                <Input
                    required={true}
                    name="name"
                    title="Event Name"
                    value={name}
                    handleChange={handleChange}
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
                    required={true}
                    name="address"
                    title="Address"
                    value={address}
                    handleChange={handleChange}
                />
                <Input
                    required={true}
                    name="city"
                    title="City"
                    value={city}
                    handleChange={handleChange}
                />
                <Input
                    required={true}
                    name="state"
                    title="State"
                    value={state}
                    handleChange={handleChange}
                />
                <h3>Date and Time</h3>
                <Input
                    required={true}
                    name="date"
                    type="date"
                    title="Date"
                    value={date}
                    handleChange={handleChange}
                />
                <Input
                    required={true}
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
