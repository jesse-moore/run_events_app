import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Layout } from '../../../components/Common/Layout';
import { EditorForm } from '../../../components/CreateEvent/EditorForm';
import { ToolBar } from '../../../components/CreateEvent/ToolBar';
import { DiscardModal } from '../../../components/Editor/DiscardModal';
import { eventState } from '../../../lib/redux/reducers';

const CreateEvent = () => {
    const router = useRouter();
    const [discardWarning, setDiscardWarning] = useState(false);

    const handleDiscard = () => {
        router.push('/app');
    };

    return (
        <Layout>
            {discardWarning && (
                <DiscardModal
                    title="Discard Event?"
                    closeHandler={() => setDiscardWarning(false)}
                    confirmHandler={handleDiscard}
                />
            )}
            <ToolBar handleDiscard={() => setDiscardWarning(true)} />
            <EditorForm />
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

export default CreateEvent;
