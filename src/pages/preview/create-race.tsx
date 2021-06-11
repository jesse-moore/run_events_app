import React from 'react';
import { raceState } from '../../lib/redux/reducers';
import { Layout } from '../../components/Common/Layout';
import { ToolBar } from '../../components/Preview/ToolBar';
import { CreateRaceForm } from '../../components/Preview/CreateRaceForm';

const createRace = () => {
    return (
        <Layout>
            <ToolBar />
            <CreateRaceForm />
        </Layout>
    );
};

export function getStaticProps() {
    return {
        props: {
            initialReduxState: { race: { ...raceState.race, id: 'preview' } },
            reduxReducer: ['race'],
        },
    };
}

export default createRace;
