import dayjs from 'dayjs';
import { EventActionInterface, EventInterface } from '../../types';

export const init = ({
    name = '',
    heroImg = { name: null, size: null, src: null, file: null, error: null },
    date = dayjs().format('YYYY-MM-DD'),
    address = '',
    city = '',
    state = '',
    time = dayjs('01/01/2021 12:00').format('HH:mm'),
    eventDetails = '',
}): EventInterface => {
    return {
        name,
        heroImg,
        date,
        address,
        city,
        state,
        time,
        eventDetails,
    };
};

export const reducer = (
    state: EventInterface,
    action: EventActionInterface
) => {
    switch (action.type) {
        case 'updateName':
            return { ...state, name: action.payload };
        case 'updateDate':
            return { ...state, date: action.payload };
        case 'updateAddress':
            return { ...state, address: action.payload };
        case 'updateCity':
            return { ...state, city: action.payload };
        case 'updateState':
            return { ...state, state: action.payload };
        case 'updateTime':
            return { ...state, time: action.payload };
        case 'updateHeroImg':
            return { ...state, heroImg: action.payload };
        case 'updateEventDetails':
            return { ...state, eventDetails: action.payload };
        case 'init':
            return action.payload ? init(action.payload) : init({});
        default:
            return state;
    }
};
