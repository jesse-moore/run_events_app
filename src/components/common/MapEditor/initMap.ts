import mapboxgl, { LngLatLike, Map } from 'mapbox-gl';

interface InitMapInterface {
    center?: LngLatLike;
    container: HTMLElement;
    zoom?: number;
    canvasClickHandler: any;
}

export const initMap = (options: InitMapInterface): Map => {
    const {
        center = [0, 0],
        zoom = 10,
        container,
        canvasClickHandler,
    } = options;

    const map = new mapboxgl.Map({
        container,
        style: 'mapbox://styles/mapbox/streets-v11',
        center,
        zoom,
    });
    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
    });
    map.on('load', () => {
        map.addControl(new mapboxgl.NavigationControl({ showCompass: false }));
        map.addSource('points', {
            type: 'geojson',
            data: { type: 'FeatureCollection', features: [] },
        });

        map.addSource('route', {
            type: 'geojson',
            data: { type: 'FeatureCollection', features: [] },
        });

        map.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
                'line-join': 'round',
                'line-cap': 'round',
                visibility: 'visible',
            },
            paint: {
                'line-color': '#c40000',
                'line-width': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    10,
                    1,
                    14,
                    3,
                ],
            },
            minzoom: 9,
        });

        map.addLayer({
            id: 'points',
            type: 'circle',
            source: 'points',
            paint: {
                'circle-color': [
                    'match',
                    ['get', 'type'],
                    'start',
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
                    'start',
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
    });
    map.on('click', (e) => {
        canvasClickHandler(e);
    });
    map.on('mouseenter', 'points', function (e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';
        console.log(e);
        if (!e.features) return;
        const coordinates = e.lngLat;
        // const { title, types } = e.features[0].properties;
        // const typesList = types
        //     .split(', ')
        //     .map((type) => {
        //         return `<li>${type}</li>`;
        //     })
        //     .join('');
        const title = 'TITLE';
        const description = `<h3 class="text-lg">${title}</h3>`;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        // while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        //     coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        // }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(description).addTo(map);
    });

    map.on('mouseleave', 'points', function () {
        map.getCanvas().style.cursor = 'grab';
        popup.remove();
    });

    return map;
};
