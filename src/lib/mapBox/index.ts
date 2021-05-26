import { Feature } from 'geojson';
import mapboxgl, {
    EventData,
    GeoJSONSource,
    LngLat,
    LngLatLike,
    Map,
    MapMouseEvent,
    MapTouchEvent,
} from 'mapbox-gl';
import { Dispatch, SetStateAction } from 'react';
import { Marker } from '../../types';
import { initMap as _initMap } from './initMap';
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY || '';

const movingPoint: Marker = {
    type: 'Feature',
    geometry: {
        type: 'Point',
        coordinates: [0, 0],
    },
    properties: {
        type: '',
        amenities: '',
        id: '',
    },
};

let map: Map | undefined;
interface InitMapInterface {
    center?: LngLatLike;
    container: HTMLElement;
    zoom?: number;
    canvasClickHandler: (event?: MapMouseEvent & EventData) => void;
    setMovedPoint: Dispatch<SetStateAction<{ coords: number[]; id: string }>>;
}

export const initMap = (options: InitMapInterface) => {
    if (map) return;
    const {
        center = [0, 0],
        zoom = 10,
        container,
        canvasClickHandler,
        setMovedPoint,
    } = options;

    map = new mapboxgl.Map({
        container,
        style: 'mapbox://styles/mapbox/streets-v11',
        center,
        zoom,
    });
    map.on('click', canvasClickHandler);
    map.on('mousedown', 'points', function (e) {
        // Prevent the default map drag behavior.
        e.preventDefault();
        console.log(e.originalEvent);
        if (!e.features || !e.features[0].properties) return;
        movingPoint.geometry.coordinates = [e.lngLat.lng, e.lngLat.lat];
        const properties = e.features[0].properties as Marker['properties'];
        movingPoint.properties = properties;
        const movingPointSrc = e.target.getSource(
            'movingPoint'
        ) as GeoJSONSource;
        movingPointSrc.setData({
            type: 'FeatureCollection',
            features: [movingPoint],
        });

        e.target.getCanvas().style.cursor = 'grab';

        e.target.on('mousemove', onMove);
        e.target.once('mouseup', onUp);
    });

    map.on('touchstart', 'point', function (e) {
        if (e.points.length !== 1) return;
        // Prevent the default map drag behavior.
        e.preventDefault();

        e.target.on('touchmove', onMove);
        e.target.once('touchend', onUp);
    });

    function onMove(e: MapTouchEvent & EventData) {
        var coords = e.lngLat;

        // Set a UI indicator for dragging.
        e.target.getCanvas().style.cursor = 'grabbing';
        movingPoint.geometry.coordinates = [coords.lng, coords.lat];
        const pointsSrc = e.target.getSource('movingPoint') as GeoJSONSource;
        pointsSrc.setData({
            type: 'FeatureCollection',
            features: [movingPoint],
        });
        // Update the Point feature in `geojson` coordinates
        // and call setData to the source layer `point` on it.
        // geojson.features[0].geometry.coordinates = [coords.lng, coords.lat];
        // map.getSource('point').setData(geojson);
    }

    function onUp(e: MapTouchEvent & EventData) {
        var coords = [e.lngLat.lng, e.lngLat.lat];
        setMovedPoint({ coords, id: movingPoint.properties.id });

        const pointsSrc = e.target.getSource('movingPoint') as GeoJSONSource;
        pointsSrc.setData({
            type: 'FeatureCollection',
            features: [],
        });
        e.target.getCanvas().style.cursor = 'grab';

        // Unbind mouse/touch events
        e.target.off('mousemove', onMove);
        e.target.off('touchmove', onMove);
    }
    _initMap(map);
    return map;
};

export const removeMap = () => {
    map = undefined;
};

export const setPoints = (points: Feature[]) => {
    if (!map) return;
    const pointsSrc = map.getSource('points') as GeoJSONSource;
    if (!pointsSrc) return;
    pointsSrc.setData({ type: 'FeatureCollection', features: points });
};

export const setRoutePoints = (routePoints: Feature) => {
    if (!map) return;
    const pointsSrc = map.getSource('points') as GeoJSONSource;
    if (!pointsSrc) return;
    pointsSrc.setData({ type: 'FeatureCollection', features: [routePoints] });
};
