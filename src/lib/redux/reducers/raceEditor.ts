import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { stat } from 'fs';
import { Feature } from 'geojson';
import { RaceEditorInterface, Marker } from '../../../types';

const initialState: RaceEditorInterface = {
    name: '',
    points: [],
    routePoints: [],
    activeTool: '',
    tools: {
        addMarker: false,
        createRoute: false,
        select: true,
    },
    modals: {
        markerOptions: {
            active: false,
            position: { x: 0, y: 0 },
            marker: null,
        },
    },
};

const reducers = {
    updateName: (state: RaceState, action: PayloadAction<string>) => {
        state.name = action.payload;
    },
    addMarker: (state: RaceState, action: PayloadAction<Marker>) => {
        state.points = [...state.points, action.payload];
    },
    addRoutePoint: (state: RaceState, action: PayloadAction<number[]>) => {
        state.routePoints = [...state.routePoints, action.payload];
    },
    undoAddRoutePoint: (state: RaceState) => {
        if (state.routePoints.length > 0) state.routePoints.pop();
    },
    undoAddMarker: (state: RaceState) => {
        state.modals.markerOptions.active = false;
        if (state.points.length > 0) state.points.pop();
    },
    init: () => {
        return initialState;
    },
    updateState: (state: RaceState) => {
        return state;
    },
    setAddMarkerActive: (state: RaceState) => {
        state.tools.addMarker = true;
        state.tools.createRoute = false;
        state.tools.select = false;
    },
    setCreateRouteActive: (state: RaceState) => {
        state.tools.addMarker = false;
        state.tools.createRoute = true;
        state.tools.select = false;
    },
    setSelectActive: (state: RaceState) => {
        state.tools.addMarker = false;
        state.tools.createRoute = false;
        state.tools.select = true;
    },
    openMarkerOptionsModal: (
        state: RaceState,
        action: PayloadAction<{
            position: { y: number; x: number };
            marker: Marker;
        }>
    ) => {
        state.modals.markerOptions.active = true;
        state.modals.markerOptions.position = action.payload.position;
        state.modals.markerOptions.marker = action.payload.marker;
    },
    closeMarkerOptionsModal: (state: RaceState) => {
        state.modals.markerOptions.active = false;
        state.modals.markerOptions.position = { y: 0, x: 0 };
    },
    removeMarker: (state: RaceState, action: PayloadAction<string>) => {
        const newPoints = state.points.filter((point) => {
            return point.properties.id !== action.payload;
        });
        state.points = newPoints;
    },
    updateMarker: (
        state: RaceState,
        action: PayloadAction<{
            id: string;
            type?: string;
            amenities?: string;
            coordinates?: number[];
        }>
    ) => {
        const newPoints = state.points.map((point) => {
            if (point.properties.id === action.payload.id) {
                console.log(action.payload.amenities);
                if (action.payload.type) {
                    point.properties.type = action.payload.type;
                }
                if (action.payload.amenities !== undefined) {
                    point.properties.amenities = action.payload.amenities;
                }
                if (action.payload.coordinates) {
                    point.geometry.coordinates = action.payload.coordinates;
                }
            }
            return point;
        });
        state.points = newPoints;
    },
};

export const raceSlice = createSlice({
    name: 'race',
    initialState,
    reducers,
});

export const actions = raceSlice.actions;

export default raceSlice.reducer;
export const raceInitialState = initialState;
export type RaceState = typeof initialState;
