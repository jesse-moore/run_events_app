import React, { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    useUserRaceByIdLazyQuery,
    useUpdateRaceMutation,
} from '../../../lib/generated/graphql-frontend';
import { raceState, RootState } from '../../../lib/redux/reducers';
import { Layout } from '../../../components/Common/Layout';
import RaceEditor from '../../../components/RaceEditor';
import { RaceEditorState } from '../../../types';
import { useRouter } from 'next/router';
import { actions } from '../../../lib/redux/reducers/raceEditor';

type State = RootState & { race: RaceEditorState };

const EditRace = () => {
    const [userRaceById, { called, data, loading, error }] =
        useUserRaceByIdLazyQuery();
    const [updateRace] = useUpdateRaceMutation();
    const dispatch = useDispatch();
    const state = useSelector((state: State) => state.race);
    const router = useRouter();

    useEffect(() => {
        const { id } = router.query;
        if (id && !Array.isArray(id)) {
            userRaceById({ variables: { id } });
        }
    }, [router.query]);

    useEffect(() => {
        if (!data || loading) return;
        if ((!data.userRaceByID && called) || error) {
            router.push('/app');
            return;
        }
        if (data.userRaceByID) {
            const { name, distance, route, event, id } = data.userRaceByID;
            const raceInput = {
                id,
                name,
                distance,
                points: route.points.features,
                routePoints: route.route.features,
                eventId: event.id,
                routeStartMarker: route.routeStartMarker,
                routeEndMarker: route.routeEndMarker,
            };
            dispatch(actions.updateState(raceInput));
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
            await updateRace({
                variables: {
                    raceUpdates: raceInput,
                    raceId: state.id,
                },
            });
            const eventId = state.eventId;
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

export default EditRace;
