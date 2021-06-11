import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react';
import { Layout } from '../components/Common/Layout';
import { useEventsQuery, EventsQuery } from '../lib/generated/graphql-frontend';

const domain = process.env.NEXT_PUBLIC_DOMAIN;

const Events = () => {
    const { data, error, loading } = useEventsQuery();

    return (
        <Layout>
            <div className="relative mx-auto flex flex-col max-w-3xl">
                {data && <EventList events={data.events} />}
            </div>
        </Layout>
    );
};

const EventList = ({ events }: EventsQuery) => {
    return (
        <>
            {events.map((event) => {
                return <EventElement event={event} />;
            })}
        </>
    );
};

type Event = EventsQuery['events'][0];

const EventElement = ({ event }: { event: Event }) => {
    if (!event) return null;
    const { slug, name, dateTime, city, state, races } = event;
    const date = dayjs(dateTime).format('dddd MMMM DD, YYYY');
    return (
        <Link href={`http://${slug}.${domain}`}>
            <div className="min-h-full max-w-full shadow rounded p-4 my-4 bg-white flex-wrap min-w-min whitespace-nowrap cursor-pointer">
                <div className="grid grid-rows-1 grid-cols-12 mb-2 items-center">
                    <div className="col-span-4">
                        <div className="text-2xl text-gray-900">{name}</div>
                        {races.length !== 0 && (
                            <div className="flex flex-row mt-2">
                                {races.map((race) => (
                                    <Race
                                        name={race.name}
                                        key={slug + race.name}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="col-span-4 text-lg">{date}</div>
                    <div className="col-span-4 text-lg">{`${city}, ${state}`}</div>
                </div>
            </div>
        </Link>
    );
};

const Race = ({ name }: { name: string }) => {
    return (
        <div
            style={{ backgroundColor: `#93C5FD` }}
            className="py-1 px-2 mr-2 rounded-xl text-sm"
        >
            {name}
        </div>
    );
};

export default Events;
