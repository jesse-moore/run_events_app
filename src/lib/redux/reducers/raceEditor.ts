import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Feature, LineString } from 'geojson';
import {
    RaceEditorInterface,
    Marker,
    RaceEditorTools,
    RaceInput,
    RaceLocalPreview,
} from '../../../types';

const initialState: RaceEditorInterface = {
    id: '',
    name: '',
    distance: 0,
    eventId: '',
    points: [],
    routePoints: [],
    routeStartMarker: null,
    routeEndMarker: null,
    activeTool: '',
    tools: {
        addMarker: false,
        moveMarker: false,
        addWaypoint: false,
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
    updateDistance: (state: RaceState, action: PayloadAction<string>) => {
        const distance = parseFloat(action.payload) * 100;
        state.distance = Number(distance.toFixed(0));
    },
    updateEventId: (state: RaceState, action: PayloadAction<string>) => {
        state.eventId = action.payload;
    },

    addMarker: (state: RaceState, action: PayloadAction<Marker>) => {
        state.points = [...state.points, action.payload];
    },
    addRoutePoint: (
        state: RaceState,
        action: PayloadAction<Feature<LineString>>
    ) => {
        state.routePoints = [...state.routePoints, action.payload];
    },
    addStartMarker: (state: RaceState, action: PayloadAction<Marker>) => {
        state.routeStartMarker = action.payload;
    },
    addEndMarker: (state: RaceState, action: PayloadAction<Marker>) => {
        state.routeEndMarker = action.payload;
    },
    undoAddRoutePoint: (state: RaceState) => {
        const length = state.routePoints.length;
        // if (length > 0) state.routePoints.pop();
        if (length === 1 && state.routeEndMarker) {
            state.routeEndMarker = null;
            state.routePoints = [];
        } else if (length === 0 && state.routeStartMarker) {
            state.routeStartMarker = null;
        } else if (length > 1) {
            state.routePoints.pop();
            const end = state.routePoints[state.routePoints.length - 1];
            if (!end || !state.routeEndMarker) return;
            const endCoords =
                end.geometry.coordinates[end.geometry.coordinates.length - 1];
            state.routeEndMarker.geometry.coordinates = endCoords;
        }
    },
    undoAddMarker: (state: RaceState) => {
        state.modals.markerOptions.active = false;
        if (state.points.length > 0) state.points.pop();
    },
    init: () => {
        return initialState;
    },
    updateState: (state: RaceState, actions: PayloadAction<RaceInput>) => {
        return { ...state, ...actions.payload };
    },
    initStateFromLocal: (
        _state: RaceState,
        actions: PayloadAction<RaceLocalPreview>
    ) => {
        return { ...initialState, ...actions.payload };
    },
    setToolActive: (
        state: RaceState,
        action: PayloadAction<RaceEditorTools>
    ) => {
        state.tools.addMarker = false;
        state.tools.moveMarker = false;
        state.tools.addWaypoint = false;
        state.tools.select = false;
        state.tools[action.payload] = true;
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
