import { Feature, FeatureCollection } from 'geojson';
import mapboxgl, {
    EventData,
    EventedListener,
    GeoJSONSource,
    LngLatLike,
    Map,
    MapMouseEvent,
} from 'mapbox-gl';
import { initMap as _initMap } from './initMap';
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY || '';

let map: Map | undefined;
interface InitMapInterface {
    center?: LngLatLike;
    container: HTMLElement;
    zoom?: number;
    canvasClickHandler: (event?: MapMouseEvent & EventData) => void;
}

export const initMap = (options: InitMapInterface) => {
    if (map) return;
    const {
        center = [0, 0],
        zoom = 10,
        container,
        canvasClickHandler,
    } = options;

    map = new mapboxgl.Map({
        container,
        style: 'mapbox://styles/mapbox/streets-v11',
        center,
        zoom,
    });
    map.on('click', canvasClickHandler);
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
