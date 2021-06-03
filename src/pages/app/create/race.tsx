import React, { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { raceState, RootState } from '../../../lib/redux/reducers';
import { actions } from '../../../lib/redux/reducers/raceEditor';
import {
    useUserEventByIdLazyQuery,
    useCreateRaceMutation,
} from '../../../lib/generated/graphql-frontend';
import { Layout } from '../../../components/Common/Layout';
import RaceEditor from '../../../components/RaceEditor';
import { RaceEditorInterface } from '../../../types';

type State = RootState & { race: RaceEditorInterface };

const CreateRace = () => {
    const [userEventByID, { data, loading, error, called }] =
        useUserEventByIdLazyQuery();
    const [createRace] = useCreateRaceMutation();
    const dispatch = useDispatch();
    const state = useSelector((state: State) => state.race);
    const router = useRouter();

    useEffect(() => {
        const { id } = router.query;
        if (id && !Array.isArray(id)) {
            userEventByID({ variables: { id } });
        }
    }, [router.query]);

    useEffect(() => {
        if (!data || loading) return;
        if ((!data.userEventByID && called) || error) {
            router.push('/app');
            return;
        }
        if (data.userEventByID) {
            dispatch(actions.updateEventId(data.userEventByID.id));
        }
    }, [data, loading, error, called]);

    const handleDiscard = () => {
        const eventId = state.eventId;
        router.push(`/app/editor/event?id=${eventId}`);
    };

    const handleSave = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {
            name,
            distance,
            points,
            eventId,
            routePoints,
            routeEndMarker,
            routeStartMarker,
        } = state;
        const raceInput = {
            name,
            distance,
            route: {
                points: {
                    type: 'FeatureCollection',
                    features: points,
                },
                route: {
                    type: 'FeatureCollection',
                    features: routePoints,
                },
                routeEndMarker,
                routeStartMarker,
            },
        };

        try {
            await createRace({
                variables: {
                    race: raceInput,
                    eventId,
                },
            });
            router.push(`/app/editor/event?id=${eventId}`);
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <Layout>
            <RaceEditor handleDiscard={handleDiscard} handleSave={handleSave} />
        </Layout>
    );
};

export function getStaticProps() {
    return {
        props: {
            initialReduxState: raceState,
            reduxReducer: ['race'],
        },
    };
}

export default CreateRace;
