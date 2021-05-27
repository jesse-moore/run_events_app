import {
    configureStore,
    DeepPartial,
    Store,
    ReducersMapObject,
    Reducer,
} from '@reduxjs/toolkit';
import { rootState, RootState, reducers } from './reducers';
import { useMemo } from 'react';

export let store: Store | undefined;
const rootReducer = { ui: reducers.ui, user: reducers.user };

function initStore(
    preloadedState: RootState = rootState,
    reducer: ReducersMapObject = rootReducer
) {
    return configureStore({
        reducer: reducer,
        preloadedState,
    });
}

export const initializeStore = (
    preloadedState: RootState,
    reducer: ReducersMapObject
) => {
    let _store = store ?? initStore(preloadedState, reducer);

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        const { ui, user, event, race } = store.getState();
        const state: RootState = { ui, user };
        if (reducer.event) state.event = event;
        if (reducer.race) state.race = race;
        _store = initStore(
            {
                ...preloadedState,
                ...state,
            },
            reducer
        );
        // Reset the current store
        store = undefined;
    }

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store;
    // Create the store once in the client
    if (!store) store = _store;
    return _store;
};

export function useStore(initialState: RootState, pageReducersRefs: string[]) {
    const pageReducers = getPageReducers(pageReducersRefs);
    const reducer = { ...rootReducer, ...pageReducers };
    const store = useMemo(
        () => initializeStore(initialState, reducer),
        [initialState, reducer]
    );
    return store;
}

const getPageReducers = (refs: string[] = []) => {
    const pageReducers: { [k: string]: Reducer } = {};
    refs.forEach((ref) => {
        const reducer = Object.getOwnPropertyDescriptor(reducers, ref);
        if (reducer) {
            pageReducers[ref] = reducer.value;
        }
    });
    return pageReducers;
};
