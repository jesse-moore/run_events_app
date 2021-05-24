import { FeatureCollection } from 'geojson';
import mapboxgl, { EventData, Map, MapMouseEvent } from 'mapbox-gl';

export class mapboxMap {
    map!: Map;
    element: HTMLDivElement;
    isLoaded: boolean;
    points: FeatureCollection;

    constructor() {
        this.element = document.createElement('div');
        this.isLoaded = false;
        this.points = { type: 'FeatureCollection', features: [] };
    }

    loadMap(_data: { route: any; points: any }) {
        return new Promise((resolve) => {
            this.map = new mapboxgl.Map({
                container: this.element,
                style: 'mapbox://styles/mapbox/outdoors-v11',
                center: [-94.115251, 36.184605],
                maxZoom: 14,
                minZoom: 10,
            });
            // route = route || {
            //     type: 'FeatureCollection',
            //     features: [],
            // };

            // if (route.features.length > 0) {
            //     this.bounds = getBounds(route);
            //     this.fitBounds();
            // }

            this.map.on('load', () => {
                this.map.scrollZoom.disable();
                this.map.doubleClickZoom.disable();
                this.map.addControl(
                    new mapboxgl.NavigationControl({ showCompass: false })
                );
                this.map.addSource('points', {
                    type: 'geojson',
                    data: this.points,
                });
                // this.map.addSource('route', {
                //     type: 'geojson',
                //     data: route,
                // });

                // this.map.addLayer({
                //     id: 'route',
                //     type: 'line',
                //     source: 'route',
                //     layout: {
                //         'line-join': 'round',
                //         'line-cap': 'round',
                //         visibility: 'visible',
                //     },
                //     paint: {
                //         'line-color': '#c40000',
                //         'line-width': [
                //             'interpolate',
                //             ['linear'],
                //             ['zoom'],
                //             10,
                //             1,
                //             14,
                //             3,
                //         ],
                //     },
                //     minzoom: 9,
                // });

                this.map.addLayer({
                    id: 'points',
                    type: 'circle',
                    source: 'points',
                    paint: {
                        'circle-color': [
                            'match',
                            ['get', 'type'],
                            'Start / Finish',
                            '#A3E635',
                            'Aid Station Level 1',
                            '#BFDBFE',
                            'Aid Station Level 2',
                            '#C4B5FD',
                            'Restroom',
                            '#FDBA74',
                            '#D4D4D8',
                        ],
                        'circle-stroke-color': [
                            'match',
                            ['get', 'type'],
                            'Start / Finish',
                            '#4D7C0F',
                            'Aid Station Level 1',
                            '#1E3A8A',
                            'Aid Station Level 2',
                            '#5B21B6',
                            'Restroom',
                            '#9A3412',
                            '#000000',
                        ],
                        'circle-stroke-width': 2,
                        'circle-radius': 10,
                    },
                    minzoom: 9,
                });

                this.isLoaded = true;
                resolve({ isLoaded: this.isLoaded });
            });

            const popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false,
            });

            this.map.on('click', async function (e) {
                const coords = eventToFeature(e);
                console.log(coords);
                // Add starting point to the map
                // if (route.data.waypoints.length == 0) {
                //     const index = 0;
                //     const point = coordsToWaypointPoint(coords, index, false);

                //     route.data.waypoints.push(point);

                //     drawWaypoints();
                // } else {
                // const index = route.data.waypoints.length;
                // const point = coordsToWaypointPoint(
                //     coords,
                //     index,
                //     goingDirect
                // );

                // route.data.waypoints.push(point);

                // const legIndex = index - 1;
                // const prevIndex = index - 1;
                // const start =
                //     route.data.waypoints[prevIndex].geometry.coordinates;
                // const end =
                //     route.data.waypoints[index].geometry.coordinates;

                // let [lineString, legSteps] = await processDirections(
                //     start,
                //     end,
                //     legIndex,
                //     goingDirect
                // );

                // route.data.legs.push(lineString);
                // route.data.directions.push(legSteps);

                // drawDirections();
                // drawWaypoints();
                // drawRoute();
                // }
            });
            // this.map.on('mouseenter', 'points', function (e) {
            //     // Change the cursor style as a UI indicator.
            //     this.getCanvas().style.cursor = 'pointer';

            //     const coordinates = e.features[0].geometry.coordinates.slice();
            //     const { title, types } = e.features[0].properties;
            //     const typesList = types
            //         .split(', ')
            //         .map((type) => {
            //             return `<li>${type}</li>`;
            //         })
            //         .join('');
            //     const description = `<h3 class="text-lg">${title}</h3><ul>${typesList}</ul>`;

            //     // Ensure that if the map is zoomed out such that multiple
            //     // copies of the feature are visible, the popup appears
            //     // over the copy being pointed to.
            //     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            //         coordinates[0] +=
            //             e.lngLat.lng > coordinates[0] ? 360 : -360;
            //     }

            //     // Populate the popup and set its coordinates
            //     // based on the feature found.
            //     popup.setLngLat(coordinates).setHTML(description).addTo(this);
            // });

            // this.map.on('mouseleave', 'points', function () {
            //     this.getCanvas().style.cursor = '';
            //     popup.remove();
            // });
        });
    }

    // fitBounds() {
    //     this.map.fitBounds(this.bounds, { padding: 100 });
    // }

    // loadSource({ route, points }) {
    //     this.map.getSource('route').setData(route);
    //     if (points) {
    //         this.map.getSource('points').setData(pointsToGeojson(points));
    //     }
    //     this.bounds = getBounds(route);
    //     this.fitBounds();
    // }

    // removeSources() {
    //     if (this.map.getSource('route')) {
    //         this.map.getSource('route').setData({
    //             type: 'FeatureCollection',
    //             features: [],
    //         });
    //     }
    //     if (this.map.getSource('points')) {
    //         this.map.getSource('points').setData(pointsToGeojson(null));
    //     }
    // }
}

// const pointsToGeojson = (points: { lat: number; lng: number }) => {
//     let features;
//     if (points) {
//         features = points.map(({ lat, lng }) => {
//             return {
//                 // feature for Mapbox DC
//                 type: 'Feature',
//                 geometry: {
//                     type: 'Point',
//                     coordinates: [lng, lat],
//                 },
//                 // properties: {
//                 //     title: name,
//                 //     types: aidTypes,
//                 //     type,
//                 // },
//             };
//         });
//     } else {
//         features = [];
//     }
//     return { type: 'FeatureCollection', features };
// };

// export const getBounds = (geojson: FeatureCollection) => {
//     const coordinates = geojson.features[0].geometry.coordinates;
//     const bounds = coordinates.reduce(function (bounds, coord) {
//         return bounds.extend(coord);
//     }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
//     return bounds;
// };

function eventToFeature(e: MapMouseEvent & EventData) {
    const lat = e.lngLat.lat;
    const lng = e.lngLat.lng;
    return {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [lng, lat],
        },
        // properties: {
        //     title: name,
        //     types: aidTypes,
        //     type,
        // },
    };
}
