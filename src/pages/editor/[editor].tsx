import React from 'react';
import { eventState, raceState } from '../../lib/redux/reducers';
import { Layout } from '../../components/Common/Layout';
import EventEditor from '../../components/EventEditor';
import RaceEditor from '../../components/RaceEditor';

const Create_event = ({ editor }: { editor: string }) => {
    return (
        <Layout>
            {editor === 'event' && <EventEditor />}
            {editor === 'race' && <RaceEditor />}
        </Layout>
    );
};

export function getStaticProps({ params }: any) {
    return {
        props: {
            initialReduxState: { ...eventState, ...raceState },
            reduxReducer: ['event', 'race'],
            editor: params.editor,
        },
    };
}

export async function getStaticPaths() {
    const paths = [
        { params: { editor: 'event' } },
        { params: { editor: 'race' } },
    ];
    return { paths, fallback: false };
}

export default Create_event;
