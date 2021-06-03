import React, { FormEventHandler, useState } from 'react';
import { EditToolBar } from './EditToolBar';
import { MapEditor } from './MapEditor/';
import { DiscardModal } from '../Editor/DiscardModal';
import { RaceDetailsEdit } from './RaceDetailsEdit';

interface RaceEditor {
    handleDiscard: () => void;
    handleSave: FormEventHandler<HTMLFormElement>;
}

const RaceEditor = ({ handleDiscard, handleSave }: RaceEditor) => {
    const [discardWarning, setDiscardWarning] = useState(false);

    return (
        <div className="bg-blueGray-100">
            {discardWarning && (
                <DiscardModal
                    title="Discard Changes?"
                    closeHandler={() => setDiscardWarning(false)}
                    confirmHandler={handleDiscard}
                />
            )}
            <EditToolBar handleDiscard={() => setDiscardWarning(true)} />
            <div className="mx-auto h-500 w-full px-8">
                <RaceDetailsEdit handleSave={handleSave} />
                <MapEditor />
            </div>
        </div>
    );
};

export default RaceEditor;
