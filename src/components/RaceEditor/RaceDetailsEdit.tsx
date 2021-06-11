import React, { FormEventHandler } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../lib/redux/reducers/raceEditor';
import { RootState } from '../../lib/redux/reducers';
import { RaceEditorInterface } from '../../types';

import { Input } from '../Form/Input';

interface RaceDetailsEdit {
    handleSave?: FormEventHandler<HTMLFormElement>;
}

type State = RootState & { race: RaceEditorInterface };

export const RaceDetailsEdit = ({ handleSave }: RaceDetailsEdit) => {
    const state = useSelector((state: State) => state.race);
    const dispatch = useDispatch();
    const { distance, name } = state;
    return (
        <div className="flex flex-row justify-center">
            <form onSubmit={handleSave} id="createRace">
                <div className="w-96 mx-2">
                    <Input
                        name="name"
                        title="Name"
                        required={true}
                        value={name}
                        handleChange={({ target }) =>
                            dispatch(actions.updateName(target.value))
                        }
                    />
                </div>
                <div className="w-36 mx-2 flex flex-row items-end">
                    <Input
                        name="distance"
                        title="Distance"
                        required={true}
                        type="number"
                        step={0.1}
                        value={distance/100}
                        handleChange={({ target }) =>
                            dispatch(actions.updateDistance(target.value))
                        }
                    />
                    <span className="pb-4 pl-2">Miles</span>
                </div>
            </form>
        </div>
    );
};
