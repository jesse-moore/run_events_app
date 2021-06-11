import React, { useState } from 'react';
import { useSaveEventDescriptionMutation } from '../../lib/generated/graphql-frontend';
import dynamic from 'next/dynamic';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
    ssr: false,
});
import 'easymde/dist/easymde.min.css';
import { Button } from '../Common/Button';
import { DiscardModal } from './DiscardModal';

interface EditEventDescription {
    id: string;
    description: string;
    submitHandler: () => void;
    cancelHandler: () => void;
}

export const EditEventDescription = ({
    id,
    description,
    submitHandler,
    cancelHandler,
}: EditEventDescription) => {
    const [saveDescription] = useSaveEventDescriptionMutation();
    const [discardWarning, setDiscardWarning] = useState<boolean>(false);
    const [state, setState] = useState<string>();

    const handleSubmit = async () => {
        if (!state) return;
        const res = await saveDescription({
            variables: { eventDescription: state, id },
        });
        if (res.data) {
            submitHandler();
        } else {
            // TODO Handle Error
        }
    };

    return (
        <div>
            <SimpleMDE onChange={setState} value={description} />
            <div className="flex flex-row justify-end -mr-4 py-2">
                <Button
                    name="Discard Changes"
                    color="red"
                    onClick={() => setDiscardWarning(true)}
                    type="button"
                />
                <Button name="Save" color="green" onClick={handleSubmit} />
            </div>
            {discardWarning && (
                <DiscardModal
                    title="Discard Changes to Event Description?"
                    closeHandler={() => setDiscardWarning(false)}
                    confirmHandler={cancelHandler}
                />
            )}
        </div>
    );
};
