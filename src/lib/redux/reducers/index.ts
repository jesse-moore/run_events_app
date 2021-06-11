import ui, { uiInitialState } from './ui';
import user, { userInitialState } from './user';
import event, { eventInitialState } from './eventEditor';
import race, { raceInitialState } from './raceEditor';
import { EventInterface, RaceEditorInterface } from '../../../types';

export const reducers = { ui, user, event, race };

export const rootState = {
    ui: uiInitialState,
    user: userInitialState,
};

export const eventState = { event: eventInitialState };
export const raceState = { race: raceInitialState };
export type RootState = {
    ui: typeof uiInitialState;
    user: typeof userInitialState;
    event?: EventInterface;
    race?: RaceEditorInterface;
};
