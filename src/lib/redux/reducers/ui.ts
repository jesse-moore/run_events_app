import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    modals: {
        signupForm: false,
        loginForm: false,
        deleteEvent: {
            id: '',
            name: '',
            active: false,
            position: { x: 0, y: 0 },
        },
    },
};

const reducers = {
    toggleSignupForm: (state: uiState) => {
        state.modals.signupForm = !state.modals.signupForm;
    },
    toggleLoginForm: (state: uiState) => {
        state.modals.loginForm = !state.modals.loginForm;
    },
    deleteEvent: (
        state: uiState,
        action: PayloadAction<{
            id: string;
            name: string;
            x: number;
            y: number;
        }>
    ) => {
        const { id, name, x, y } = action.payload;
        state.modals.deleteEvent = {
            active: true,
            id,
            name,
            position: { x, y },
        };
    },
    closeDeleteEvent: (state: uiState) => {
        state.modals.deleteEvent = {
            active: false,
            id: '',
            name: '',
            position: { x: 0, y: 0 },
        };
    },
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers,
});

export const {
    toggleSignupForm,
    toggleLoginForm,
    deleteEvent,
    closeDeleteEvent,
} = uiSlice.actions;

export default uiSlice.reducer;
export const uiInitialState = initialState;
export type uiState = typeof initialState;
