import mapboxgl, { Map } from 'mapbox-gl';
import { MapBoxState, Marker } from '../../types';

export const onLoadHandler = (map: Map, state: MapBoxState = {}): void => {
    let startPoint: Marker[] = [];
    let endPoint: Marker[] = [];
    if (state.startPoint) startPoint = [state.startPoint];
    if (state.endPoint) endPoint = [state.endPoint];

    map.on('load', () => {
        map.addControl(new mapboxgl.NavigationControl({ showCompass: false }));
        map.addSource('points', {
            type: 'geojson',
            data: { type: 'FeatureCollection', features: state.points || [] },
        });

        map.addSource('route', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: state.routePoints || [],
            },
        });
        map.addSource('startPoint', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: startPoint,
            },
        });
        map.addSource('endPoint', {
            type: 'geojson',
            data: { type: 'FeatureCollection', features: endPoint },
        });

        map.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
                'line-join': 'round',
                'line-cap': 'round',
                visibility: 'visible',
            },
            paint: {
                'line-color': '#c40000',
                'line-width': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    10,
                    1,
                    14,
                    3,
                ],
            },
            minzoom: 9,
        });

        map.addLayer({
            id: 'startPoint',
            type: 'circle',
            source: 'startPoint',
            paint: {
                'circle-color': '#A3E635',
                'circle-stroke-color': '#4D7C0F',
                'circle-stroke-width': 1,
                'circle-radius': 7,
            },
            minzoom: 9,
        });

        map.addLayer({
            id: 'endPoint',
            type: 'circle',
            source: 'endPoint',
            paint: {
                'circle-color': '#e63535',
                'circle-stroke-color': '#7c0f0f',
                'circle-stroke-width': 1,
                'circle-radius': 7,
            },
            minzoom: 9,
        });

        map.addLayer({
            id: 'points',
            type: 'circle',
            source: 'points',
            paint: {
                'circle-color': [
                    'match',
                    ['get', 'type'],
                    'start',
                    '#A3E635',
                    'Aid Station',
                    '#BFDBFE',
                    'Aid Station Level 2',
                    '#C4B5FD',
                    'Restroom',
                    '#FDBA74',
                    '#D4D4D8',
                ],
                'circle-stroke-color': [
                    'match',
                    ['get', 'type'],
                    'start',
                    '#4D7C0F',
                    'Aid Station',
                    '#1E3A8A',
                    'Aid Station Level 2',
                    '#5B21B6',
                    'Restroom',
                    '#9A3412',
                    '#000000',
                ],
                'circle-stroke-width': 2,
                'circle-radius': 10,
            },
            minzoom: 9,
        });
    });
};
