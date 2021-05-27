import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import mapboxgl from 'mapbox-gl';

import { createMarker } from '../../../lib/utils';
import {
    initMap,
    setPoints,
    setRoutePoints,
    setStartPoint,
    setEndPoint,
    removeMap,
} from '../../../lib/mapBox/';

import { RaceEditorState } from '../../../types';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY || '';

export const MapboxMap = () => {
    const state = useSelector((state: RaceEditorState) => state.race);
    const { points, routePoints, routeStartMarker, routeEndMarker } = state;
    const mapContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mapContainer.current) return; // initialize map only once
        initMap({
            options: {
                center: [-94.115251, 36.184605],
                container: mapContainer.current,
                zoom: 14,
            },
            state: {
                points,
                routePoints,
                startPoint: routeStartMarker || undefined,
                endPoint: routeEndMarker || undefined,
            },
        });
        return () => {
            removeMap();
        };
    }, []);

    useEffect(() => {
        setPoints(points);
    }, [points]);

    useEffect(() => {
        const marker = routeStartMarker || createMarker();
        setStartPoint(marker);
    }, [routeStartMarker]);

    useEffect(() => {
        const marker = routeEndMarker || createMarker();
        setEndPoint(marker);
    }, [routeEndMarker]);

    useEffect(() => {
        setRoutePoints(routePoints);
    }, [routePoints]);

    return (
        <div className="h-full w-full relative">
            <div className="relative h-full w-full" ref={mapContainer} />
        </div>
    );
};
