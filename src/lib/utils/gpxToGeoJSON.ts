import { FeatureCollection } from 'geojson';
const toGeoJSON = require('@tmcw/togeojson');

export const gpxToGeoJSON = async (file: File) => {
    const gpxString = await readGPXFile(file);
    const parser = new DOMParser();
    const doc = parser.parseFromString(gpxString, 'text/xml');
    const geoJSON: FeatureCollection = toGeoJSON.gpx(doc);
    return stripMetaData(geoJSON);
};

const stripMetaData = (geoJSON: FeatureCollection) => {
    const features = geoJSON.features.map((feature) => {
        feature.properties = {};
        return feature;
    });
    return { ...geoJSON, features };
};

const readGPXFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (!file) reject({ error: 'Invalid input' });
        try {
            if (file.size > 1000000) {
                const fileSize = Math.round(file.size / 10000) / 100;
                reject({
                    error: `File must be smaller than 1MB, file size is ${fileSize}MB.`,
                });
            }
            const reader = new FileReader();
            reader.onload = function ({ target }) {
                if (target) {
                    const result = target?.result as string;
                    resolve(result);
                } else {
                    reject({ error: 'Could not read gpx file' });
                }
            };
            reader.readAsText(file);
        } catch (error) {
            reject({ error: error.message });
        }
    });
};
