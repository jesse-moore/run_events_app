import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gpxToGeoJSON } from '../../lib/utils';
import { ToolBar } from './ToolBar';
import { DialogModal } from '../Common/DialogModal';
import { MapEditor } from './MapEditor/';
import { RaceEditorInterface } from '../../types';
import { FileInput } from './FileInput';
import { RootState } from '../../lib/redux/reducers';
import { actions } from '../../lib/redux/reducers/raceEditor';

type State = RootState & { race: RaceEditorInterface };

const RaceEditor = () => {
    const dispatch = useDispatch();
    const state = useSelector((state: State) => state.race);
    const [discardWarning, setDiscardWarning] = useState(false);

    useEffect(() => {}, []);

    // useEffect(() => {
    //     localStorage.setItem('raceState', JSON.stringify(eventState));
    // }, [eventState]);

    const handleDiscard = (confirm?: boolean) => {
        if (confirm === true) {
            localStorage.removeItem('raceState');
            dispatch(actions.init());
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
                <MapEditor />
            </div>
        </div>
    );
};

export default RaceEditor;
