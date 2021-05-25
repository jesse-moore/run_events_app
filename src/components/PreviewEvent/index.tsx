import React, { useEffect, useState } from 'react';
import { EventInterface } from '../../types';

import { Hero } from '../Event/Hero';
import { EventDetails } from '../Event/EventDetails';
import { initDB, getItem } from '../../lib/utils/indexDB';
import { imageToDataURL } from '../../lib/utils';

export const PreviewEvent = () => {
    const [event, setEvent] = useState<EventInterface>();

    useEffect(() => {
        const init = async () => {
            try {
                let localState: EventInterface;
                await initDB();
                const data = localStorage.getItem('eventState');
                if (data) {
                    localState = JSON.parse(data);
                    const heroImgFile = await getItem('heroImg');
                    if (heroImgFile) {
                        const heroImg = await imageToDataURL(heroImgFile);
                        localState.heroImg = heroImg;
                    }
                    setEvent(localState);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        init();
        window.addEventListener('storage', init, true);
        return () => {
            window.removeEventListener('storage', init, true);
        };
    }, []);
    if (!event) return null;
    const eventState = event as unknown as EventInterface;
    const { name, date, heroImg, address, city, state, eventDetails } =
        eventState;
    return (
        <div>
            <div className="mt-4 mx-4">
                <Hero {...{ date, name, heroImg, address, city, state }} />
                <EventDetails eventDetails={eventDetails} />
            </div>
        </div>
    );
};
