import dayjs from 'dayjs';
import { UserEventsQuery } from '../generated/graphql-frontend';

const eventForCardObj = {
    name: '',
    date: '',
    city: '',
    state: '',
    id: '',
};

export const eventForCard = (
    data: UserEventsQuery | undefined
): typeof eventForCardObj[] => {
    if (!data) return [];
    const { userEvents } = data;
    const events: typeof eventForCardObj[] = [];
    userEvents.forEach((event) => {
        if (event === null || !event.id) return;
        const eventForCard = Object.assign({}, eventForCardObj);
        eventForCard.id = event.id;
        if (event.name) eventForCard.name = event.name;
        if (event.dateTime) {
            const date = dayjs(event.dateTime).format('dddd MMMM DD, YYYY');
            eventForCard.date = date;
        }

        if (event.city) eventForCard.city = event.city;
        if (event.state) eventForCard.state = event.state;
        events.push(eventForCard);
    });
    return events;
};
