import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteEvent } from '../../lib/redux/reducers/ui';
import { Button } from './Button';
import { ButtonLink } from './ButtonLink';

interface EventCard {
    event: {
        id: string;
        name: string;
        date: string;
        city: string;
        state: string;
    };
}

export const EventCard = ({ event }: EventCard) => {
    const dispatch = useDispatch();
    const { name, date, city, state, id } = event;
    return (
        <div className="flex flex-row items-center min-h-full max-w-full shadow rounded p-4 my-4 bg-white flex-wrap min-w-min whitespace-nowrap">
            <div className="mr-auto relative">
                <div className="text-2xl mb-2 mr-2 text-gray-900">{name}</div>
                <div className="flex flex-row">
                    {/* {types.map((type) => (
						<Type type={type} key={slug + type} />
                    ))} */}
                </div>
            </div>
            <div className="flex flex-row flex-wrap font-thin text-lg">
                <div className="mr-auto w-64">{date}</div>
                <div className="w-52">{`${city}, ${state}`}</div>
            </div>
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
        </div>
    );
};
