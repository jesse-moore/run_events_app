import React from 'react';
import { useUserEventsQuery } from '../../lib/generated/graphql-frontend';
import { eventForCard } from '../../lib/utils/parseEventData';
import { Layout } from '../../components/Common/Layout';
import { EventCard } from '../../components/Common/EventCard';
import { ButtonLink } from '../../components/Common/ButtonLink';
import Link from 'next/link';

const App = () => {
    const { data, loading } = useUserEventsQuery();
    const events = eventForCard(data);

    return (
        <Layout authenticatedRoute={true}>
            <div className="relative mx-auto flex flex-col max-w-4xl">
                <div className="relative">
                    <h1 className=" text-center py-4">Events</h1>
                    <div
                        className="absolute top-1/2 right-0"
                        style={{ transform: 'translateY(-50%)' }}
                    >
                        <Link href="/app/editor/event" passHref>
                            <ButtonLink color="blue" name="Create New Event" />
                        </Link>
                    </div>
                </div>
                {loading
                    ? null
                    : events.map((event) => <EventCard event={event} />)}
            </div>
        </Layout>
    );
};

export default App;
