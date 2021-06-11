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
    slug: '',
    errors: {
        slug: '',
    },
    modals: {
        deleteRace: {
            id: '',
            name: '',
            active: false,
            position: { x: 0, y: 0 },
        },
    },
};

const reducers = {
    updateName: (state: EventInterface, action: PayloadAction<string>) => {
        state.name = action.payload;
    },
    updateSlug: (state: EventInterface, action: PayloadAction<string>) => {
        state.slug = action.payload;
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
    updateSlugError: (state: EventInterface, action: PayloadAction<string>) => {
        state.errors.slug = action.payload;
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
    deleteRace: (
        state: EventInterface,
        action: PayloadAction<{
            id: string;
            name: string;
            x: number;
            y: number;
        }>
    ) => {
        const { id, name, x, y } = action.payload;
        state.modals.deleteRace = {
            active: true,
            id,
            name,
            position: { x, y },
        };
    },
    closeDeleteRace: (state: EventInterface) => {
        state.modals.deleteRace = {
            active: false,
            id: '',
            name: '',
            position: { x: 0, y: 0 },
        };
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
