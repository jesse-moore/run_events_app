import React, { useEffect } from 'react';
import { EventInterface, RaceEditorInterface } from '../../types';
import { actions as eventActions } from '../../lib/redux/reducers/eventEditor';
import { actions as raceActions } from '../../lib/redux/reducers/raceEditor';

import { Hero } from '../Event/Hero';
import dynamic from 'next/dynamic';
const EventDetails = dynamic(() => import('../Event/EventDetails'), {
    ssr: false,
});
import { MapboxMap } from '../RaceEditor/MapEditor/Map';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../lib/redux/reducers';
import { getBounds, setBounds } from '../../lib/mapBox';

type State = RootState & { event: EventInterface; race: RaceEditorInterface };

export const ViewEvent = () => {
    const dispatch = useDispatch();
    const { event, race } = useSelector((state: State) => state);
    useEffect(() => {
        const init = async () => {
            try {
                const eventData = localStorage.getItem('eventState');
                const raceData = localStorage.getItem('raceState');
                if (eventData) {
                    const localState: EventInterface = JSON.parse(eventData);
                    dispatch(eventActions.updateEvent(localState));
                }
                if (raceData) {
                    const localState: RaceEditorInterface =
                        JSON.parse(raceData);
                    dispatch(raceActions.initStateFromLocal(localState));
                    if (localState.routePoints.length) {
                        const bounds = getBounds(localState.routePoints);
                        setBounds(bounds);
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        init();
        window.addEventListener('storage', init, true);
        return () => {
            window.removeEventListener('storage', init, true);
        };
    }, []);

    if (!event) return null;
    const { name, date, heroImg, address, city, state, eventDetails } = event;
    const { routePoints } = race;
    return (
        <div className="max-w-4xl mx-auto bg-blueGray-50 p-4">
            <Hero {...{ date, name, heroImg, address, city, state }} />
            <EventDetails eventDetails={eventDetails} />
            {routePoints.length && (
                <div>
                    <h2 className="text-center">{race.name}</h2>
                    <div className="h-500 mx-auto">
                        <MapboxMap />
                    </div>
                </div>
            )}
        </div>
    );
};
