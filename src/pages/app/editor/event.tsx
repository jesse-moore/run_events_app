import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '../../../components/Common/Layout';

import {
    EventDetailsState,
    EventInterface,
    RaceEditorState,
} from '../../../types';
import { useRouter } from 'next/router';
import { eventState, raceState, RootState } from '../../../lib/redux/reducers';
import { useUserEventByIdLazyQuery } from '../../../lib/generated/graphql-frontend';
import { EditEventDetails } from '../../../components/Editor/EditEventDetails';
import { EditButton } from '../../../components/Editor/EditButton';
import { EventRace } from '../../../components/Editor/EventRace';
import { Section } from '../../../components/Editor/Section';
import { ViewEventDetails } from '../../../components/Editor/ViewEventDetails';

type State = RootState & { event: EventInterface; race: RaceEditorState };

const Create_event = () => {
    const dispatch = useDispatch();
    const [editDetails, setEditDetails] = useState(false);
    const [userEventByID, { data, loading, error, called }] =
        useUserEventByIdLazyQuery();
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
    }, [data, loading, error, called]);

    const handleEventDetailsSave = (eventDetails: EventDetailsState) => {
        setEditDetails(false);
        console.log(eventDetails);
    };

    if (!called || loading || !data?.userEventByID) return null;
    const { __typename, ...event } = data.userEventByID;
    return (
        <Layout>
            <div className="relative mx-auto flex flex-col items-center max-w-2xl">
                <div className="bg-white w-full rounded shadow mt-4">
                    <h2 className="text-center">Event Name</h2>
                    {editDetails ? (
                        <EditEventDetails
                            eventDetails={event}
                            submitHandler={handleEventDetailsSave}
                            cancelHandler={() => setEditDetails(false)}
                        />
                    ) : (
                        <ViewEventDetails
                            eventDetails={event}
                            editClickHandler={() => setEditDetails(true)}
                        />
                    )}
                    <Section title="Event Description">
                        <p>Event Description</p>
                        <EditButton />
                    </Section>

                    <div className="mt-8">
                        <h2 className="text-center">Races</h2>
                        <EventRace />
                        <EventRace />
                        <EventRace />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export function getStaticProps() {
    return {
        props: {
            initialReduxState: { ...eventState, ...raceState },
            reduxReducer: ['event', 'race'],
        },
    };
}

export default Create_event;
