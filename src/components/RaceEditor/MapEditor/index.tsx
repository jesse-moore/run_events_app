import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../../lib/redux/reducers/raceEditor';
import mapboxgl, { EventData, LngLat, MapMouseEvent } from 'mapbox-gl';
import { Feature, LineString, Position } from 'geojson';
import axios from 'axios';
import { createMarker } from '../../../lib/utils';

import { EditorTools } from './EditorTools';
import { MapboxMap } from './Map';
import { Legend } from './Legend';
import { MarkerOptions } from './MarkerOptions';
import { Marker, RaceEditorState } from '../../../types';

export const MapEditor = () => {
    const dispatch = useDispatch();
    const state = useSelector((state: RaceEditorState) => state.race);
    const [mapClick, setMapClick] = useState<MapMouseEvent & EventData>();
    const [movedPoint, setMovedPoint] = useState<{
        coords: number[];
        id: string;
    }>({ coords: [], id: '' });

    const handleAddMarkerEvent = (event: MapMouseEvent & EventData) => {
        const features = event.target.queryRenderedFeatures(event.point, {
            layers: ['points'],
        });
        const clickedMarker =
            features.length !== 0 && features[0].source === 'points';
        let marker: Marker | undefined;
        if (!clickedMarker) {
            const markerPosition = event.lngLat;
            marker = createMarker(markerPosition);
            dispatch(actions.addMarker(marker));
        } else if (features[0].properties) {
            const featureID = features[0].properties.id;
            marker = state.points.find((m) => m.properties.id === featureID);
        }
        const position = { x: event.point.x, y: event.point.y };
        if (!marker) return;
        dispatch(
            actions.openMarkerOptionsModal({
                position,
                marker,
            })
        );
    };

    const handleCreateRouteEvent = (event: MapMouseEvent & EventData) => {
        console.log('CREATE ROUTE');
        // if (addMarker) {
        //     console.log('EVENT: ', event);
        //     const feature = eventToFeature(event);
        //     console.log('FEATURE: ', feature);
        //     dispatch(actions.addMarker(feature));
        // }
    };

    const handleSelectEvent = (event: MapMouseEvent & EventData) => {
        console.log('SELECT');
        console.log('POINTS: ', state.points);
    };

    useEffect(() => {
        if (!mapClick) return;
        if (state.tools.addMarker) {
            handleAddMarkerEvent(mapClick);
        } else if (state.tools.createRoute) {
            handleCreateRouteEvent(mapClick);
        } else if (state.tools.select) {
            handleSelectEvent(mapClick);
        }
        setMapClick(undefined);
        // if (state.tools.addMarker) {
        //     const feature = eventToFeature(clickEvent);
        //     dispatch(actions.addMarker(feature));
        // } else if (createRoute) {
        //     const newPoint = [clickEvent.lngLat.lng, clickEvent.lngLat.lat];
        //     dispatch(actions.addRoutePoint(newPoint));
        //     const newPoints = [...routePoints, newPoint];
        //     if (newPoints.length === 1) {
        //         const startFeature = coordsToStartFeature(newPoint);
        //         const startSrc = map.getSource('points') as GeoJSONSource;
        //         startSrc.setData({
        //             type: 'FeatureCollection',
        //             features: [startFeature],
        //         });
        //     } else {
        //         const last = newPoints.length - 1;
        //         const addNextFeature = async () => {
        //             const feature = await getMatchRoute(
        //                 newPoints[last - 1],
        //                 newPoints[last]
        //             );
        //             setRoutePoints([...routePoints, ...feature.coordinates]);
        //         };
        //         addNextFeature();
        //     }
        // } else {
        //     const features = map.queryRenderedFeatures(clickEvent.point, {
        //         layers: ['points'],
        //     });
        //     console.log(features);
        // }
    }, [mapClick]);

    useEffect(() => {
        dispatch(
            actions.updateMarker({
                coordinates: movedPoint.coords,
                id: movedPoint.id,
            })
        );
    }, [movedPoint]);

    const { modals } = state;
    return (
        <>
            <EditorTools tools={state.tools} />
            <div className="h-full w-full relative">
                <MapboxMap
                    canvasClickHandler={setMapClick}
                    setMovedPoint={setMovedPoint}
                />
                <Legend />
                {modals.markerOptions.active && <MarkerOptions />}
            </div>
        </>
    );
};

const getMatchRoute = async (
    lnglat1: number[],
    lnglat2: number[]
): Promise<LineString> => {
    const accessToken = mapboxgl.accessToken;
    const coords1 = `${lnglat1.join(',')}`;
    const coords2 = `${lnglat2.join(',')}`;
    const base = 'https://api.mapbox.com/directions/v5/mapbox/walking/';
    const url = `${base}${coords1};${coords2}?geometries=geojson&access_token=${accessToken}`;
    const res = await axios.get(url);
    if (res.data.code === 'Ok') {
        return res.data.routes[0].geometry;
    } else {
        console.log(res.data);
        throw new Error('Failed to match route');
    }
};

function eventToFeature(e: MapMouseEvent & EventData): Feature {
    const lat = e.lngLat.lat;
    const lng = e.lngLat.lng;
    return {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [lng, lat],
        },
        properties: {
            // title: '',
            // types: '',
            // type: '',
        },
    };
}

const coordsToStartFeature = (coordinates: Position): Feature => {
    return {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates,
        },
        properties: {
            title: 'Start',
            type: 'start',
        },
    };
};
