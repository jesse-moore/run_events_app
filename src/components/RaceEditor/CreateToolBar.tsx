import React, { ReactEventHandler } from 'react';
import { Button } from '../Common/Button';

interface CreateToolBar {
    handleDiscard: ReactEventHandler<Element>;
}

export const CreateToolBar = ({ handleDiscard }: CreateToolBar) => {
    return (
        <div className="py-2 px-4 bg-blueGray-200 sticky top-0 z-30">
            <div className="flex flex-row justify-end">
                <div>
                    <Button
                        color="orange"
                        name="Discard"
                        onClick={handleDiscard}
                    />
                    <Button
                        color="green"
                        name="Save"
                        type="submit"
                        form="createRace"
                    />
                </div>
            </div>
        </div>
    );
};
