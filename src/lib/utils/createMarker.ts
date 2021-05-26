import { nanoid } from 'nanoid';
import { LngLat } from 'mapbox-gl';
import { Marker } from '../../types';

export const createMarker = (position: LngLat): Marker => {
    return {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [position.lng, position.lat],
        },
        properties: {
            id: nanoid(),
            type: '',
            amenities: '',
        },
    };
};
