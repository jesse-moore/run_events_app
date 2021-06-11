import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../lib/redux/reducers';
import { actions } from '../../lib/redux/reducers/raceEditor';
import { RaceEditorInterface, RaceLocalPreview } from '../../types';
import { MapEditor } from '../RaceEditor/MapEditor';
import { RaceDetailsEdit } from '../RaceEditor/RaceDetailsEdit';

type State = RootState & { race: RaceEditorInterface };

export const CreateRaceForm = () => {
    const state = useSelector((state: State) => state.race);
    const dispatch = useDispatch();

    useEffect(() => {
        const initFromLocalStorage = async () => {
            const data = localStorage.getItem('raceState');
            if (data) {
                const localState: RaceLocalPreview = JSON.parse(data);
                dispatch(actions.initStateFromLocal(localState));
            }
        };
        initFromLocalStorage();
    }, []);

    useEffect(() => {
        const newState: RaceLocalPreview = {
            name: state.name,
            distance: state.distance,
            points: state.points,
            routePoints: state.routePoints,
            routeEndMarker: state.routeEndMarker,
            routeStartMarker: state.routeStartMarker,
        };
		
        localStorage.setItem('raceState', JSON.stringify(newState));
    }, [state]);

    return (
        <div className="mx-auto h-500 w-full px-8">
            <RaceDetailsEdit />
            <MapEditor />
        </div>
    );
};
