import React, { useState, useEffect, useReducer } from 'react';
import dayjs from 'dayjs';

import { InputMessage } from '../Common/InputMessage';
import { EventDetailsInput } from './EventDetailsInput';
import { EventActionInterface, EventInterface } from '../../types';
import { Button } from '../Common/Button';

function init({
    name = '',
    heroImg = {},
    date = dayjs().format('dddd MMMM DD, YYYY'),
    address = '',
    city = '',
    state = '',
    time = dayjs().format('HH:mm'),
    eventDetails = '',
}): EventInterface {
    return {
        name,
        heroImg,
        date,
        address,
        city,
        state,
        time,
        eventDetails,
    };
}

function processImage(
    input: FileList | null,
    dispatch: React.Dispatch<EventActionInterface>
): void {
    if (!input) return;
    try {
        if (input && input[0]) {
            if (input[0].size > 4000000) {
                const fileSize = Math.round(input[0].size / 10000) / 100;
                throw new Error(
                    `File must be smaller than 4MB, file size is ${fileSize}MB.`
                );
            }
            const reader = new FileReader();
            reader.onload = function ({ target }) {
                dispatch({
                    type: 'updateHeroImg',
                    payload: {
                        image: target?.result,
                        name: input[0].name,
                        size: input[0].size,
                    },
                });
            };
            reader.readAsDataURL(input[0]);
        }
    } catch (error) {
        dispatch({
            type: 'updateHeroImg',
            payload: { error: { message: error.message } },
        });
    }
}

function reducer(state: EventInterface, action: EventActionInterface) {
    switch (action.type) {
        case 'updateName':
            return { ...state, name: action.payload };
        case 'updateDate':
            return { ...state, date: action.payload };
        case 'updateAddress':
            return { ...state, address: action.payload };
        case 'updateCity':
            return { ...state, city: action.payload };
        case 'updateState':
            return { ...state, state: action.payload };
        case 'updateTime':
            return { ...state, time: action.payload };
        case 'updateHeroImg':
            return { ...state, heroImg: action.payload };
        case 'updateEventDetails':
            return { ...state, eventDetails: action.payload };
        case 'init':
            return action.payload ? init(action.payload) : init({});
        default:
            return state;
    }
}

const EventEditor = () => {
    const [eventState, dispatch] = useReducer(reducer, {}, init);
    const history = useHistory();
    useEffect(() => {
        try {
            const data = localStorage.getItem('eventState');
            if (data) {
                const localState = JSON.parse(data);
                dispatch({ type: 'init', payload: localState });
            }
        } catch (error) {
            console.log(error.message);
        }
        const reInit = () => {
            const data = localStorage.getItem('eventState');
            if (data) {
                const localState = JSON.parse(data);
                dispatch({ type: 'init', payload: localState });
            }
        };
        window.addEventListener('storage', reInit, true);
        return () => {
            window.removeEventListener('storage', reInit, true);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem('eventState', JSON.stringify(eventState));
    }, [eventState]);

    const {
        date,
        time,
        name,
        address,
        city,
        state,
        heroImg,
        eventDetails,
    } = eventState;
    return (
        <div className="bg-blueGray-100">
            <div className="py-2 px-4 bg-blueGray-200 sticky top-0 z-10">
                <div className="flex flex-row">
                    <div className="mr-auto">
                        <Button
                            type="back"
                            name="Back"
                            onClick={() => history.goBack()}
                        />
                    </div>
                    <div>
                        <Button type="discard" name="Discard" />
                        <Link to="/preview-local" target="_blank">
                            <Button type="preview" name="Live Preview" />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="mt-4 w-max mx-auto">
                <form className="p-4">
                    <h2>Basic Info</h2>
                    <Input
                        title="Event Name"
                        value={name}
                        action="updateName"
                        dispatch={dispatch}
                    />
                    <h3>Location</h3>
                    <Input
                        title="Address"
                        value={address}
                        action="updateAddress"
                        dispatch={dispatch}
                    />
                    <Input
                        title="City"
                        value={city}
                        action="updateCity"
                        dispatch={dispatch}
                    />
                    <Input
                        title="State"
                        value={state}
                        action="updateState"
                        dispatch={dispatch}
                    />
                    <h3>Date and Time</h3>
                    <Input
                        type="date"
                        title="Date"
                        value={date}
                        action="updateDate"
                        dispatch={dispatch}
                    />
                    <Input
                        type="time"
                        title="Time"
                        value={time}
                        action="updateTime"
                        dispatch={dispatch}
                    />
                    <h2>Hero Image</h2>
                    <ImageInput
                        title="Image"
                        value={heroImg}
                        action="updateHeroImg"
                        dispatch={dispatch}
                    />
                    <h2>Event Details</h2>
                    <EventDetailsInput
                        value={eventDetails}
                        dispatch={dispatch}
                    />
                    {/* <LongTextInput value={eventDetails} dispatch={dispatch} /> */}
                </form>
            </div>
        </div>
    );
};

interface BaseInputInterface {
    children: React.ReactNode;
    title: string;
}
interface InputInterface {
    type?: string;
    title: string;
    value: any;
    action: string;
    dispatch: React.Dispatch<EventActionInterface>;
}

const BaseInput = ({ title, children }: BaseInputInterface) => {
    return (
        <div className="my-2">
            <label className="block">
                <span className="text-gray-700">{title}</span>
                {children}
            </label>
        </div>
    );
};
const Input = ({
    type = 'text',
    title,
    value,
    action,
    dispatch,
}: InputInterface) => {
    return (
        <BaseInput title={title}>
            <input
                className="mt-1 block w-96 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={value}
                type={type}
                onChange={({ target }) =>
                    dispatch({ type: action, payload: target.value })
                }
            ></input>
        </BaseInput>
    );
};
const ImageInput = ({ title, value, action, dispatch }: InputInterface) => {
    const { name, image } = value;
    return (
        <>
            <div className="my-2">
                <span className="text-gray-700">{title}</span>
                <label className="flex flex-col mt-1 w-max overflow-hidden relative">
                    <input
                        className="absolute -top-full"
                        type="file"
                        accept="image/*"
                        onChange={({ target }) =>
                            processImage(target.files, dispatch)
                        }
                    ></input>
                    <span className="bg-blueGray-400 px-2 py-1 w-max rounded hover:bg-blueGray-300 cursor-pointer">
                        {image ? 'Upload New Image' : 'Upload Image'}
                    </span>
                    {value.error && (
                        <InputMessage type="error">
                            {value.error.message}
                        </InputMessage>
                    )}
                </label>
            </div>

            {!value.error && (
                <div>
                    <div>{name}</div>
                    <div className="w-96 max-h-56 overflow-y-auto">
                        <img src={image} alt={name} />
                    </div>
                </div>
            )}
        </>
    );
};

export default EventEditor

