import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { eventState, raceState, RootState } from '../../../lib/redux/reducers';
import { Layout } from '../../../components/Common/Layout';
import RaceEditor from '../../../components/RaceEditor';
import { EventInterface, RaceEditorState } from '../../../types';
import { useRouter } from 'next/router';

type State = RootState & { event: EventInterface; race: RaceEditorState };

const Create_event = () => {
    const router = useRouter();
    const state = useSelector((state: State) => state);
    const { id } = router.query;
    console.log(state.race);
    return (
        <Layout>
            <RaceEditor />
        </Layout>
    );
};

export function getStaticProps() {
    return {
        props: {
            initialReduxState: { ...eventState, ...raceState },
            reduxReducer: ['event', 'race'],
        },
    };
}

export default Create_event;
