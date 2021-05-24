import React, { useEffect, useReducer, useState } from 'react';
import { gpxToGeoJSON } from '../../lib/utils';
import { reducer, init } from './reducer';
import { ToolBar } from './ToolBar';
import { DialogModal } from '../Common/DialogModal';
import { MapboxMap } from '../Common/Map';
import { EventInterface } from '../../types';
import { FileInput } from './FileInput';

const RaceEditor = () => {
    const [eventState, dispatch] = useReducer(reducer, {}, init);
    const [discardWarning, setDiscardWarning] = useState(false);

    useEffect(() => {
        const initFromLocalStorage = () => {
            const data = localStorage.getItem('racesState');
            if (data) {
                const localState: EventInterface = JSON.parse(data);
                const initState = {
                    ...localState,
                };
                dispatch({ type: 'init', payload: initState });
            }
        };
        initFromLocalStorage();
        window.addEventListener('storage', initFromLocalStorage, true);
        return () => {
            setDiscardWarning(false);
            window.removeEventListener('storage', initFromLocalStorage, true);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem('racesState', JSON.stringify(eventState));
    }, [eventState]);

    const handleDiscard = (confirm?: boolean) => {
        if (confirm === true) {
            localStorage.removeItem('racesState');
            dispatch({ type: 'init' });
            setDiscardWarning(false);
        } else {
            setDiscardWarning(!discardWarning);
        }
    };

    const handleFileInput = async ({
        target,
    }: {
        target: HTMLInputElement;
    }) => {
        const { files } = target;
        if (files) {
            const route = await gpxToGeoJSON(files[0]);
            console.log(route);
        }
    };

    return (
        <div className="bg-blueGray-100">
            {discardWarning && (
                <DialogModal
                    title="Discard Changes?"
                    closeHandler={() => handleDiscard()}
                    confirmHandler={() => handleDiscard(true)}
                />
            )}

            <ToolBar handleDiscard={() => handleDiscard()} />
            <FileInput handleInput={handleFileInput} />
            <div className="mx-auto h-500 w-full px-8">
                <MapboxMap />
            </div>
        </div>
    );
};

export default RaceEditor;
