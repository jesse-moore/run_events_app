import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../lib/redux/reducers/eventEditor';
import {
    useDeleteRaceMutation,
    useUserEventByIdLazyQuery,
} from '../../lib/generated/graphql-frontend';
import { EventInterface, RaceDetails } from '../../types';
import { Button } from '../Common/Button';
import { ButtonLink } from '../Common/ButtonLink';
import { DiscardModal } from './DiscardModal';
import { EventItem } from './EventItem';
import { RootState } from '../../lib/redux/reducers';

interface ViewRaces {
    races: RaceDetails[];
    id: string;
}

type State = RootState & { event: EventInterface };

export const ViewRaces = ({ races, id }: ViewRaces) => {
    const [deleteRaceById] = useDeleteRaceMutation();
    const [userEventById] = useUserEventByIdLazyQuery();
    const dispatch = useDispatch();
    const state = useSelector((state: State) => state.event);

    const handleDeleteRace = async () => {
        const { id } = state.modals.deleteRace;
        await deleteRaceById({ variables: { raceId: id } });
        dispatch(actions.closeDeleteRace());
        userEventById({ variables: { id } });
    };

    const { deleteRace } = state.modals;
    return (
        <div>
            <h2 className="text-center">Races</h2>
            <div className="mt-4">
                <Races races={races} />
                <AddRace id={id} />
            </div>
            {deleteRace.active && (
                <DiscardModal
                    title={`Delete Race ${deleteRace.name}?`}
                    closeHandler={() => dispatch(actions.closeDeleteRace())}
                    confirmHandler={handleDeleteRace}
                    position={deleteRace.position}
                />
            )}
        </div>
    );
};

interface Races {
    races: RaceDetails[];
}

const Races = ({ races }: Races) => {
    const dispatch = useDispatch();
    return (
        <div>
            {races.map((race) => {
                const { name, distance, id } = race;
                return (
                    <div
                        className="relative bg-gray-100 rounded p-4 my-4 mx-4"
                        key={id}
                    >
                        {name && <EventItem title="Name" value={name} />}
                        {distance !== undefined && (
                            <EventItem title="Distance" value={`${distance/100} miles`} />
                        )}
                        <div
                            className="absolute top-1/2 right-0"
                            style={{ transform: 'translateY(-50%)' }}
                        >
                            <Button
                                name="Delete"
                                color="red"
                                onClick={(e) => {
                                    dispatch(
                                        actions.deleteRace({
                                            id,
                                            name,
                                            x: e.clientX,
                                            y: e.clientY,
                                        })
                                    );
                                }}
                            />
                            <Link href={`/app/editor/race?id=${id}`} passHref>
                                <ButtonLink name="Edit" color="orange" />
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const AddRace = ({ id }: { id: string }) => {
    return (
        <div className="flex flex-row justify-center">
            <Link href={`/app/create/race?id=${id}`} passHref>
                <ButtonLink name="Add Race" color="blue" />
            </Link>
        </div>
    );
};
