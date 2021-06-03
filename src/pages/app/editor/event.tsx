import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUserEventByIdLazyQuery } from '../../../lib/generated/graphql-frontend';
import { useSelector } from 'react-redux';

import { Layout } from '../../../components/Common/Layout';
import { EditEventDescription } from '../../../components/Editor/EditEventDescription';
import { EditEventDetails } from '../../../components/Editor/EditEventDetails';
import { Section } from '../../../components/Editor/Section';
import { ViewEventDetails } from '../../../components/Editor/ViewEventDetails';
import { ViewEventDescription } from '../../../components/Editor/ViewEventDescription';
import { ViewHeroImage } from '../../../components/Editor/ViewHeroImage';
import { EditHeroImg } from '../../../components/Editor/EditHeroImg';
import { ViewRaces } from '../../../components/Editor/ViewRaces';
import { eventState } from '../../../lib/redux/reducers';

const EditEvent = () => {
    const [editDetails, setEditDetails] = useState<boolean>(false);
    const [editDescription, setEditDescription] = useState<boolean>(false);
    const [editHeroImg, setEditHeroImg] = useState<boolean>(false);
    const [userEventByID, { data, loading, error, called }] =
        useUserEventByIdLazyQuery({ fetchPolicy: 'network-only' });
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

    const handleSubmit = async () => {
        setEditDetails(false);
        setEditDescription(false);
        setEditHeroImg(false);
        if (!data?.userEventByID) return;
        userEventByID({ variables: { id: data.userEventByID.id } });
    };

    if (!called || loading || !data?.userEventByID) return null;
    const { __typename, eventDetails, heroImg, races, ...event } =
        data.userEventByID;
    return (
        <Layout>
            <div className="relative mx-auto flex flex-col items-center max-w-2xl">
                <div className="bg-white w-full rounded shadow my-4 pb-4">
                    <h2 className="text-center">{event.name}</h2>
                    <Section title="Event Details">
                        {editDetails ? (
                            <EditEventDetails
                                eventDetails={event}
                                submitHandler={handleSubmit}
                                cancelHandler={() => setEditDetails(false)}
                            />
                        ) : (
                            <ViewEventDetails
                                eventDetails={event}
                                editClickHandler={() => setEditDetails(true)}
                            />
                        )}
                    </Section>
                    <Section title="Event Description">
                        {editDescription ? (
                            <EditEventDescription
                                id={event.id}
                                description={eventDetails}
                                submitHandler={handleSubmit}
                                cancelHandler={() => setEditDescription(false)}
                            />
                        ) : (
                            <ViewEventDescription
                                description={eventDetails}
                                editClickHandler={() =>
                                    setEditDescription(true)
                                }
                            />
                        )}
                    </Section>
                    <Section title="Hero Image">
                        {editHeroImg ? (
                            <EditHeroImg
                                heroImg={heroImg}
                                id={event.id}
                                submitHandler={handleSubmit}
                                cancelHandler={() => setEditHeroImg(false)}
                            />
                        ) : (
                            <ViewHeroImage
                                heroImg={heroImg}
                                editClickHandler={() => setEditHeroImg(true)}
                            />
                        )}
                    </Section>
                    <ViewRaces races={races} id={event.id} />
                </div>
            </div>
        </Layout>
    );
};

export function getStaticProps() {
    return {
        props: {
            initialReduxState: { ...eventState },
            reduxReducer: ['event'],
        },
    };
}

export default EditEvent;
