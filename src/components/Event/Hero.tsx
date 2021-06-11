import React from 'react';
import dayjs from 'dayjs';
import { HeroImg } from './HeroImg';
interface HeroProps {
    date: string;
    name: string;
    heroImg: {
        name: string | null;
        size: number | null;
        src: string | null;
        dataURL: string | null;
    };
    address: string;
    city: string;
    state: string;
}

export const Hero = ({
    date,
    name,
    heroImg,
    address,
    city,
    state,
}: HeroProps) => {
    const dateString = dayjs(date).format('dddd MMMM DD, YYYY');
    return (
        <HeroImg heroImg={heroImg}>
            <div className="text-5xl font-semibold">{name}</div>
            <div className="text-xl pt-4">{dateString}</div>
            <div className="text-xl pt-4">{address}</div>
            <div className="text-xl">{`${city}, ${state}`}</div>
        </HeroImg>
    );
};
