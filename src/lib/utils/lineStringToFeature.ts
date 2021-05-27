import { Feature, LineString } from 'geojson';

export const lineStringToFeature = (
    lineString: LineString
): Feature<LineString> => {
    return {
        type: 'Feature',
        geometry: lineString,
        properties: {},
    };
};
