import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import mapboxgl, { EventData, LngLat, MapMouseEvent } from 'mapbox-gl';

import { coordsToRouteFeature } from '../../../lib/utils';
import {
    initMap,
    setPoints,
    setRoutePoints,
    removeMap,
} from '../../../lib/mapBox/';

import { RaceEditorState } from '../../../types';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY || '';

interface MapboxMapProps {
    canvasClickHandler: (event?: MapMouseEvent & EventData) => void;
    setMovedPoint: Dispatch<SetStateAction<{ coords: number[]; id: string }>>;
}

export const MapboxMap = ({
    canvasClickHandler,
    setMovedPoint,
}: MapboxMapProps) => {
    const state = useSelector((state: RaceEditorState) => state.race);
    const { points, routePoints } = state;
    const mapContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mapContainer.current) return; // initialize map only once
        initMap({
            center: [-94.115251, 36.184605],
            container: mapContainer.current,
            zoom: 14,
            canvasClickHandler: canvasClickHandler,
            setMovedPoint: setMovedPoint,
        });
        return () => {
            removeMap();
        };
    }, []);

    useEffect(() => {
        setPoints(points);
    }, [points]);

    useEffect(() => {
        const newRoute = coordsToRouteFeature(routePoints);
        setRoutePoints(newRoute);
    }, [routePoints]);

    return (
        <div className="h-full w-full relative">
            <div className="relative h-full w-full" ref={mapContainer} />
        </div>
    );
};
