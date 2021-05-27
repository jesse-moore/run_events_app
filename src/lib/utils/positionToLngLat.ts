import { Position } from 'geojson';
import { LngLat } from 'mapbox-gl';

export const positionToLngLat = ([lng, lat]: Position): LngLat => {
    return new LngLat(lng, lat);
};
