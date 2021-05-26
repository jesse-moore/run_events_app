import {
    configureStore,
    DeepPartial,
    Store,
    ReducersMapObject,
    Reducer,
} from '@reduxjs/toolkit';
import { rootState, RootState, reducers } from './reducers';
import { useMemo } from 'react';

let store: Store | undefined;
const rootReducer = { ui: reducers.ui, user: reducers.user };

function initStore(
    preloadedState: DeepPartial<RootState> = rootState,
    reducer: ReducersMapObject = rootReducer
) {
    return configureStore({
        reducer: reducer,
        preloadedState,
    });
}

export const initializeStore = (
    preloadedState: DeepPartial<RootState>,
    reducer: ReducersMapObject
) => {
    let _store = store ?? initStore(preloadedState, reducer);

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        const { ui, user } = store.getState();
        _store = initStore(
            {
                ui,
                user,
                ...preloadedState,
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

export function useStore(
    initialState: DeepPartial<RootState>,
    pageReducersRefs: string[]
) {
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
