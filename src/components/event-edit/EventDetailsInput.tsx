import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { EventActionInterface } from '../../types';

interface EventDetailsProps {
    value: string;
    dispatch: React.Dispatch<EventActionInterface>;
}

export const EventDetailsInput = ({ value, dispatch }: EventDetailsProps) => {
    return (
        <div>
            <SimpleMDE
                onChange={(value) =>
                    dispatch({
                        type: 'updateEventDetails',
                        payload: value,
                    })
                }
                value={value}
            />
        </div>
    );
};
