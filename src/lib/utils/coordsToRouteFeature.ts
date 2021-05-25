import { Feature, Position } from 'geojson';

export const coordsToRouteFeature = (coordinates: Position[]): Feature => {
    return {
        type: 'Feature',
        geometry: {
            type: 'LineString',
            coordinates,
        },
        properties: {
            title: 'Start',
            type: 'start',
        },
    };
};
