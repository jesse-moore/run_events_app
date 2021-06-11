import React from 'react';
import { Layout } from '../../components/Common/Layout';
import { ViewEvent } from '../../components/Preview/ViewEvent';
import { eventState, raceState } from '../../lib/redux/reducers';

const view = () => {
    return (
        <Layout>
            <ViewEvent />
        </Layout>
    );
};

export function getStaticProps() {
    return {
        props: {
            initialReduxState: { ...raceState, ...eventState },
            reduxReducer: ['race', 'event'],
        },
    };
}

export default view;
