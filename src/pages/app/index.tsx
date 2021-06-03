import React from 'react';
import {
    useUserEventsQuery,
    useDeleteEventMutation,
} from '../../lib/generated/graphql-frontend';
import { eventForCard } from '../../lib/utils/parseEventData';
import { Layout } from '../../components/Common/Layout';
import { EventCard } from '../../components/Common/EventCard';
import { ButtonLink } from '../../components/Common/ButtonLink';
import Link from 'next/link';
import { RootState } from '../../lib/redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { DiscardModal } from '../../components/Editor/DiscardModal';
import { closeDeleteEvent } from '../../lib/redux/reducers/ui';

const App = () => {
    const state = useSelector((state: RootState) => state.ui);
    const dispatch = useDispatch();
    const { data, loading, refetch } = useUserEventsQuery();
    const [deleteEventById] = useDeleteEventMutation();
    const events = eventForCard(data);

    const handleDeleteEvent = async () => {
        const id = state.modals.deleteEvent.id;
        await deleteEventById({ variables: { id } });
        await refetch();
        dispatch(closeDeleteEvent());
    };

    const { deleteEvent } = state.modals;
    return (
        <Layout authenticatedRoute={true}>
            <div className="relative mx-auto flex flex-col max-w-4xl">
                <div className="relative">
                    <h1 className=" text-center py-4">Events</h1>
                    <div
                        className="absolute top-1/2 right-0"
                        style={{ transform: 'translateY(-50%)' }}
                    >
                        <Link href="/app/create/event" passHref>
                            <ButtonLink color="blue" name="Create New Event" />
                        </Link>
                    </div>
                </div>
                {loading
                    ? null
                    : events.map((event) => (
                          <EventCard event={event} key={event.id} />
                      ))}
            </div>
            {deleteEvent.active && (
                <DiscardModal
                    title={`Delete Event ${deleteEvent.name}?`}
                    closeHandler={() => dispatch(closeDeleteEvent())}
                    confirmHandler={handleDeleteEvent}
                    position={deleteEvent.position}
                />
            )}
        </Layout>
    );
};

export default App;
