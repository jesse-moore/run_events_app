import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    modals: {
        signupForm: false,
        loginForm: false,
    },
};

const reducers = {
    toggleSignupForm: (state: uiState) => {
        state.modals.signupForm = !state.modals.signupForm;
    },
    toggleLoginForm: (state: uiState) => {
        state.modals.loginForm = !state.modals.loginForm;
    },
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers,
});

export const { toggleSignupForm, toggleLoginForm } = uiSlice.actions;

export default uiSlice.reducer;
export const uiInitialState = initialState;
export type uiState = typeof initialState;
