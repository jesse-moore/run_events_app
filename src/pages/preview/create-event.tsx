import React from 'react';
import { eventState } from '../../lib/redux/reducers';
import { Layout } from '../../components/Common/Layout';
import { CreateEventForm } from '../../components/Preview/CreateEventForm';
import { ToolBar } from '../../components/Preview/ToolBar';

const createEvent = () => {
    return (
        <Layout redirectAuthenticated="/app">
            <ToolBar />
            <CreateEventForm />
        </Layout>
    );
};

export function getStaticProps() {
    return {
        props: {
            initialReduxState: { ...eventState },
            reduxReducer: ['event'],
        },
    };
}

export default createEvent;
