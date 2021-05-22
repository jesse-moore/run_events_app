import React, { useEffect, useReducer, useState } from 'react';
import { imageToDataURL, dataURLtoFile } from '../../lib/utils';
import { useCreateEventMutation } from '../../lib/generated/graphql-frontend';
import { reducer, init } from './reducer';
import { EditorForm } from './EditorForm';
import { ToolBar } from './ToolBar';
import { DialogModal } from '../Common/DialogModal';
import { EventInterface, HeroImg } from '../../types';

const EventEditor = () => {
    const [eventState, dispatch] = useReducer(reducer, {}, init);
    const [createEvent] = useCreateEventMutation({
        onError: (error) => console.log(error),
    });
    const [discardWarning, setDiscardWarning] = useState(false);

    useEffect(() => {
        const initFromLocalStorage = () => {
            const data = localStorage.getItem('eventState');
            if (data) {
                const localState: EventInterface = JSON.parse(data);
                const heroImgLocal = localState.heroImg;
                if (heroImgLocal.src && heroImgLocal.name) {
                    const heroImgFile = dataURLtoFile(
                        heroImgLocal.src,
                        heroImgLocal.name
                    );
                    if (heroImgFile) heroImgLocal.file = heroImgFile;
                }
                const initState = {
                    ...localState,
                    heroImg: { ...heroImgLocal },
                };
                dispatch({ type: 'init', payload: initState });
            }
        };
        initFromLocalStorage();
        window.addEventListener('storage', initFromLocalStorage, true);
        return () => {
            setDiscardWarning(false);
            window.removeEventListener('storage', initFromLocalStorage, true);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem('eventState', JSON.stringify(eventState));
    }, [eventState]);

    const handleImageInput = async ({
        target,
    }: {
        target: HTMLInputElement;
    }) => {
        const { files } = target;
        if (files) {
            try {
                const image = await imageToDataURL(files);
                dispatch({
                    type: 'updateHeroImg',
                    payload: image,
                });
            } catch ({ error }) {
                dispatch({
                    type: 'updateHeroImg',
                    payload: { error },
                });
            }
        }
    };

    const handleEventDetailsInput = (value: string) => {
        dispatch({
            type: 'updateEventDetails',
            payload: value,
        });
    };

    const handleChange = ({ target }: { target: HTMLInputElement }) => {
        const { name, value } = target;
        const actionType = `update${name[0].toUpperCase()}${name.substr(1)}`;
        dispatch({ type: actionType, payload: value });
    };

    const handleDiscard = (confirm?: boolean) => {
        if (confirm === true) {
            localStorage.removeItem('eventState');
            dispatch({ type: 'init' });
            setDiscardWarning(false);
        } else {
            setDiscardWarning(!discardWarning);
        }
    };

    const handlePublish = async () => {
        const { date, time, heroImg, ...rest } = eventState;
        const dateTime = new Date(`${date} ${time}`).toUTCString();
        const { file } = heroImg;
        const res = await createEvent({
            variables: { event: { ...rest, heroImg: file, dateTime } },
        });
        console.log('PUBLISH ERRORS: ', res.errors);
    };

    return (
        <div className="bg-blueGray-100">
            {discardWarning && (
                <DialogModal
                    title="Discard Changes?"
                    closeHandler={() => handleDiscard()}
                    confirmHandler={() => handleDiscard(true)}
                />
            )}

            <ToolBar
                handleDiscard={() => handleDiscard()}
                handlePublish={() => handlePublish()}
            />
            <EditorForm
                {...{
                    eventState,
                    handleChange,
                    handleEventDetailsInput,
                    handleImageInput,
                }}
            />
        </div>
    );
};

export default EventEditor;
