import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { EventInterface } from '../../../types';

const initialState: EventInterface = {
    name: '',
    heroImg: {
        name: null,
        size: null,
        src: null,
        dataURL: null,
        error: null,
    },
    date: dayjs().format('YYYY-MM-DD'),
    address: '',
    city: '',
    state: '',
    time: dayjs('01/01/2021 12:00').format('HH:mm'),
    eventDetails: '',
};

const reducers = {
    updateName: (state: EventInterface, action: PayloadAction<string>) => {
        state.name = action.payload;
    },
    updateDate: (state: EventInterface, action: PayloadAction<string>) => {
        state.date = action.payload;
    },
    updateTime: (state: EventInterface, action: PayloadAction<string>) => {
        state.time = action.payload;
    },
    updateAddress: (state: EventInterface, action: PayloadAction<string>) => {
        state.address = action.payload;
    },
    updateCity: (state: EventInterface, action: PayloadAction<string>) => {
        state.city = action.payload;
    },
    updateState: (state: EventInterface, action: PayloadAction<string>) => {
        state.state = action.payload;
    },
    updateHeroImg: (
        state: EventInterface,
        action: PayloadAction<EventInterface['heroImg']>
    ) => {
        state.heroImg = action.payload;
    },
    updateEventDetails: (
        state: EventInterface,
        action: PayloadAction<string>
    ) => {
        state.eventDetails = action.payload;
    },
    updateEvent: (
        _state: EventInterface,
        action: PayloadAction<EventInterface>
    ) => {
        return action.payload;
    },
    init: () => {
        return initialState;
    },
};

export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers,
});

export const actions = eventSlice.actions;

export default eventSlice.reducer;
export const eventInitialState = initialState;
