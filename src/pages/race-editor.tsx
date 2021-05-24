import React from 'react';
import mapboxgl from 'mapbox-gl';
import { Layout } from '../components/Common/Layout';
import RaceEditor from '../components/RaceEditor';

const Race_Editor = () => {
    return (
        <Layout>
            <RaceEditor />
        </Layout>
    );
};

export default Race_Editor;
