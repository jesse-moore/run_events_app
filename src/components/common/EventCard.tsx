import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteEvent } from '../../lib/redux/reducers/ui';
import { Button } from './Button';
import { ButtonLink } from './ButtonLink';

const domain = process.env.NEXT_PUBLIC_DOMAIN;
interface EventCard {
    event: {
        id: string;
        name: string;
        date: string;
        city: string;
        state: string;
        slug: string;
    };
}

export const EventCard = ({ event }: EventCard) => {
    const dispatch = useDispatch();
    const { name, date, city, state, id, slug } = event;

    return (
        <div className="min-h-full max-w-full shadow rounded p-4 my-4 bg-white flex-wrap min-w-min whitespace-nowrap">
            <div className="grid grid-rows-1 grid-cols-12 mb-2 items-center">
                <div className="text-2xl text-gray-900 col-span-4">{name}</div>
                <div className="col-span-4">{date}</div>
                <div className="col-span-4">{`${city}, ${state}`}</div>
            </div>
            <div className="flex flex-row justify-end">
                <Button
                    name="Delete"
                    color="red"
                    onClick={(e) => {
                        dispatch(
                            deleteEvent({
                                id,
                                name,
                                x: e.clientX,
                                y: e.clientY,
                            })
                        );
                    }}
                />
                <Link href={`/app/editor/event?id=${id}`} passHref>
                    <ButtonLink name="Edit" color="orange" />
                </Link>
                <a target="_blank" href={`http://${slug}.${domain}`}>
                    <Button name="View" color="blue" />
                </a>
            </div>
        </div>
    );
};
