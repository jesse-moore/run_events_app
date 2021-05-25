import { Feature, Point } from 'geojson';
import { RootState } from '../lib/redux/reducers';

export interface EventInterface {
    name: string;
    heroImg: HeroImg;
    date: string;
    address: string;
    city: string;
    state: string;
    time: string;
    eventDetails: string;
}

export interface Marker extends Feature<Point> {
    properties: {
        type: string;
        amenities: string;
        id: string;
    };
}

export type RaceEditorState = RootState & { race: RaceEditorInterface };
export interface RaceEditorInterface {
    name: string;
    points: Marker[];
    routePoints: number[][];
    activeTool: string;
    tools: {
        addMarker: boolean;
        createRoute: boolean;
        select: boolean;
    };
    modals: {
        markerOptions: {
            active: boolean;
            position: { x: number; y: number };
            marker: Marker | null;
        };
    };
}

export interface HeroImg {
    name: string | null;
    size: number | null;
    src: string | null;
    dataURL: string | null;
    error: string | null;
}
export interface UserDataInterface {
    email: string;
    email_verified: string;
    sub: string;
}

export interface EventActionInterface {
    type: string;
    payload?: any;
}
