import axios from 'axios';
import { LineString } from 'geojson';
import mapboxgl, { LngLat } from 'mapbox-gl';

export const getRoute = async (
    lnglat1: LngLat,
    lnglat2: LngLat
): Promise<LineString> => {
    const accessToken = mapboxgl.accessToken;
    const coords1 = [lnglat1.lng, lnglat1.lat];
    const coords2 = [lnglat2.lng, lnglat2.lat];
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
