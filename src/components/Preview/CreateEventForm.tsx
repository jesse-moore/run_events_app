import React, { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../../lib/redux/reducers';
import { actions } from '../../lib/redux/reducers/eventEditor';
import { Input } from '../Form/Input';
import { EventInterface } from '../../types';
import { imageToDataURL } from '../../lib/utils';
import { ImageInput } from '../CreateEvent/ImageInput';
import { EventDetailsInput } from '../CreateEvent/EventDetailsInput';

type State = RootState & { event: EventInterface };

export const CreateEventForm = () => {
    const dispatch = useDispatch();
    const eventState = useSelector((state: State) => state.event);
    const router = useRouter();
    const { date, time, name, address, city, state, heroImg, eventDetails } =
        eventState;

    useEffect(() => {
        const initFromLocalStorage = async () => {
            const data = localStorage.getItem('eventState');
            if (data) {
                const localState: EventInterface = JSON.parse(data);
                dispatch(actions.updateEvent(localState));
            }
        };
        initFromLocalStorage();
    }, []);

    useEffect(() => {
        localStorage.setItem('eventState', JSON.stringify(eventState));
    }, [eventState]);

    const handleChange = ({ target }: { target: HTMLInputElement }) => {
        const { name, value } = target;
        switch (name) {
            case 'name':
                dispatch(actions.updateName(value));
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
            } catch ({ error }) {}
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push('/preview/create-race');
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
