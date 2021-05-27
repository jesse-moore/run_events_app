import { nanoid } from 'nanoid';
import { LngLat } from 'mapbox-gl';
import { Marker } from '../../types';
import { Position } from 'geojson';

type MarkerTypes = 'base' | 'Start' | 'End';

export const createMarker = (
    position?: LngLat | Position,
    type: MarkerTypes = 'base'
): Marker => {
    let _position: Position;
    if (!position) {
        _position = [];
    } else if (position instanceof LngLat) {
        _position = [position.lng, position.lat];
    } else {
        _position = position;
    }
    return {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: _position,
        },
        properties: {
            id: type === 'base' ? nanoid() : type.toLowerCase(),
            type: type === 'base' ? '' : type,
            amenities: '',
        },
    };
};
