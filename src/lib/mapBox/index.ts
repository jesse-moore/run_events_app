import { Feature, LineString } from 'geojson';
import mapboxgl, {
    EventData,
    GeoJSONSource,
    LngLatLike,
    Map,
    MapMouseEvent,
    MapTouchEvent,
} from 'mapbox-gl';
import { Marker, MapBoxState } from '../../types';
import { onLoadHandler } from './onLoadHandler';
import { actions, RaceState } from '../redux/reducers/raceEditor';
import { store } from '../redux/store';
import { createMarker, lineStringToFeature, positionToLngLat } from '../utils';
import { getRoute } from '../utils/getRoute';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY || '';

let map: Map | undefined;
interface InitMapInterface {
    options: {
        center?: LngLatLike;
        container: HTMLElement;
        zoom?: number;
    };
    state?: MapBoxState;
}

export const initMap = ({ options, state }: InitMapInterface) => {
    if (map) return;
    const { center = [0, 0], zoom = 10, container } = options;

    map = new mapboxgl.Map({
        container,
        style: 'mapbox://styles/mapbox/streets-v11',
        center,
        zoom,
    });

    map.on('click', async function (e: MapMouseEvent & EventData) {
        if (!store) return;
        const { race }: { race: RaceState } = store.getState();
        const pointFeatures = e.target.queryRenderedFeatures(e.point, {
            layers: ['points'],
        });
        const position = { x: e.point.x, y: e.point.y };

        // Clicked on marker
        if (pointFeatures[0] && pointFeatures[0].properties) {
            if (!race.tools.moveMarker) {
                const featureID = pointFeatures[0].properties.id;
                const marker = race.points.find(
                    (m) => m.properties.id === featureID
                );
                if (!marker) return;
                store.dispatch(
                    actions.openMarkerOptionsModal({
                        position,
                        marker,
                    })
                );
            }
        }
        // Clicked on something else
        else {
            if (race.tools.addMarker) {
                const markerPosition = e.lngLat;
                const marker = createMarker(markerPosition);
                store.dispatch(actions.addMarker(marker));
                store.dispatch(
                    actions.openMarkerOptionsModal({
                        position,
                        marker,
                    })
                );
            } else if (race.tools.addWaypoint) {
                if (!race.routeStartMarker) {
                    const start = createMarker(e.lngLat, 'Start');
                    store.dispatch(actions.addStartMarker(start));
                } else {
                    const end = race.routeEndMarker || race.routeStartMarker;
                    const endPosition = end.geometry.coordinates;
                    const endLngLat = positionToLngLat(endPosition);
                    try {
                        const nextSegment = await getRoute(endLngLat, e.lngLat);
                        const feature = lineStringToFeature(nextSegment);
                        store.dispatch(actions.addRoutePoint(feature));
                        const newEndCoords =
                            nextSegment.coordinates[
                                nextSegment.coordinates.length - 1
                            ];
                        const newEnd = createMarker(newEndCoords, 'End');
                        store.dispatch(actions.addEndMarker(newEnd));
                    } catch (error) {
                        return;
                    }
                }
            } else if (race.tools.select) {
                console.log('SELECT');
            }
        }
    });
    map.on('mousedown', 'points', function (e) {
        if (!store) return;
        if (!e.features || !e.features[0].properties) return;
        const { race }: { race: RaceState } = store.getState();
        if (!race.tools.moveMarker) return;
        const markerID: string = e.features[0].properties.id;
        e.preventDefault();
        e.target.on('mousemove', onMove);
        e.target.once('mouseup', onUp);

        function onMove(e: MapTouchEvent & EventData) {
            if (!store) return;
            // Set a UI indicator for dragging.
            e.target.getCanvas().style.cursor = 'grabbing';

            const coordinates = [e.lngLat.lng, e.lngLat.lat];
            store.dispatch(actions.updateMarker({ id: markerID, coordinates }));
        }
        function onUp(e: MapTouchEvent & EventData) {
            e.target.getCanvas().style.cursor = 'pointer';

            // Unbind mouse/touch events
            e.target.off('mousemove', onMove);
            e.target.off('touchmove', onMove);
        }
    });

    map.on('touchstart', 'point', function (e) {
        // if (e.points.length !== 1) return;
        // // Prevent the default map drag behavior.
        // e.preventDefault();
        // e.target.on('touchmove', onMove);
        // e.target.once('touchend', onUp);
    });

    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
    });

    map.on('mouseenter', 'points', function (e) {
        // Change the cursor style as a UI indicator.
        e.target.getCanvas().style.cursor = 'pointer';
        if (!e.features) return;
        const coordinates = e.lngLat;
        const feature = e.features[0].properties as Marker['properties'];
        const { type, amenities } = feature;
        let list = '';
        if (amenities) {
            const amenitiesList = amenities
                .split(',')
                .map((type) => {
                    return `<li>${type}</li>`;
                })
                .join('');
            list = `<ul>${amenitiesList}</ul>`;
        }

        const description = `<h3 class="text-lg">${type}</h3>${list}`;

        popup.setLngLat(coordinates).setHTML(description).addTo(e.target);
    });

    map.on('mouseleave', 'points', function (e) {
        e.target.getCanvas().style.cursor = 'grab';
        popup.remove();
    });

    onLoadHandler(map, state);
    return map;
};

export const removeMap = () => {
    map = undefined;
};

export const setStartPoint = (marker: Marker) => {
    if (!map) return;
    const pointSrc = map.getSource('startPoint') as GeoJSONSource;
    if (!pointSrc) {
        map.once('load', (e) => {
            const pointSrc = e.target.getSource('startPoint') as GeoJSONSource;
            if (!pointSrc) return;
            pointSrc.setData({ type: 'FeatureCollection', features: [marker] });
        });
    } else {
        pointSrc.setData({ type: 'FeatureCollection', features: [marker] });
    }
};

export const setEndPoint = (marker: Marker) => {
    if (!map) return;
    const pointSrc = map.getSource('endPoint') as GeoJSONSource;
    if (!pointSrc) {
        map.once('load', (e) => {
            const pointSrc = e.target.getSource('endPoint') as GeoJSONSource;
            if (!pointSrc) return;
            pointSrc.setData({ type: 'FeatureCollection', features: [marker] });
        });
    } else {
        pointSrc.setData({ type: 'FeatureCollection', features: [marker] });
    }
};

export const setPoints = (points: Feature[]) => {
    if (!map) return;
    const pointsSrc = map.getSource('points') as GeoJSONSource;
    if (!pointsSrc) {
        map.once('load', (e) => {
            const pointsSrc = e.target.getSource('points') as GeoJSONSource;
            if (!pointsSrc) return;
            pointsSrc.setData({ type: 'FeatureCollection', features: points });
        });
    } else {
        pointsSrc.setData({ type: 'FeatureCollection', features: points });
    }
};

export const setRoutePoints = (routePoints: Feature<LineString>[]) => {
    if (!map) return;
    const pointsSrc = map.getSource('route') as GeoJSONSource;
    if (!pointsSrc) {
        map.once('load', (e) => {
            const pointsSrc = e.target.getSource('route') as GeoJSONSource;
            if (!pointsSrc) return;
            pointsSrc.setData({
                type: 'FeatureCollection',
                features: routePoints,
            });
        });
    } else {
        pointsSrc.setData({ type: 'FeatureCollection', features: routePoints });
    }
};
