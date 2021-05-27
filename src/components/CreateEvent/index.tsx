import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../lib/redux/reducers/eventEditor';
import { imageToDataURL } from '../../lib/utils';
import { putFile } from '../../lib/utils/indexDB';
import { EditorForm } from './EditorForm';
import { ToolBar } from './ToolBar';
import { DialogModal } from '../Common/DialogModal';
import { EventInterface } from '../../types';
import { RootState } from '../../lib/redux/reducers';
import { getItem, initDB } from '../../lib/utils/indexDB';

type State = RootState & { event: EventInterface };

const EventEditor = () => {
    const state = useSelector((state: State) => state.event);
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    // const [createEvent] = useCreateEventMutation({
    //     onError: (error) => console.log(error),
    // });
    const [discardWarning, setDiscardWarning] = useState(false);

    useEffect(() => {
        const initFromLocalStorage = async () => {
            await initDB();
            const data = localStorage.getItem('eventState');
            if (data) {
                const localState: EventInterface = JSON.parse(data);

                const heroImgLocalFile: File = await getItem('heroImg');
                if (heroImgLocalFile) {
                    const heroImgDataURL = await imageToDataURL(
                        heroImgLocalFile
                    );
                    localState.heroImg = heroImgDataURL;
                }
                dispatch(actions.updateEvent(localState));
            }
        };
        initFromLocalStorage();
        window.addEventListener('storage', initFromLocalStorage, true);
        setIsLoaded(true);
        return () => {
            setDiscardWarning(false);
            window.removeEventListener('storage', initFromLocalStorage, true);
        };
    }, []);

    useEffect(() => {
        if (isLoaded) {
            const { heroImg } = state;
            const { dataURL, ...rest } = heroImg;
            const localState = { ...state, heroImg: rest };
            localStorage.setItem('eventState', JSON.stringify(localState));
        }
    }, [state]);

    const handleImageInput = async ({
        target,
    }: {
        target: HTMLInputElement;
    }) => {
        const { files } = target;
        if (files) {
            try {
                await putFile('heroImg', files[0]);
                const image = await imageToDataURL(files[0]);
                dispatch(actions.updateHeroImg(image));
            } catch ({ error }) {
                dispatch(actions.updateHeroImg(error));
            }
        }
    };

    const handleEventDetailsInput = (value: string) => {
        dispatch(actions.updateEventDetails(value));
    };

    const handleChange = ({ target }: { target: HTMLInputElement }) => {
        const { name, value } = target;
        switch (name) {
            case 'name':
                dispatch(actions.updateName(value));
                break;
            case 'address':
                dispatch(actions.updateAddress(value));
                break;
            case 'city':
                dispatch(actions.updateCity(value));
                break;
            case 'state':
                dispatch(actions.updateState(value));
                break;
            case 'date':
                dispatch(actions.updateDate(value));
                break;
            case 'time':
                dispatch(actions.updateTime(value));
                break;
            default:
                break;
        }
    };

    const handleDiscard = (confirm?: boolean) => {
        if (confirm === true) {
            localStorage.removeItem('eventState');
            dispatch(actions.init());
            setDiscardWarning(false);
        } else {
            setDiscardWarning(!discardWarning);
        }
    };

    // const handlePublish = async () => {
    //     const { date, time, heroImg, ...rest } = eventState;
    //     const dateTime = new Date(`${date} ${time}`).toUTCString();
    //     const { file } = heroImg;
    //     const res = await createEvent({
    //         variables: { event: { ...rest, heroImg: file, dateTime } },
    //     });
    //     console.log('PUBLISH ERRORS: ', res.errors);
    // };

    return (
        <div className="bg-blueGray-100">
            {discardWarning && (
                <DialogModal
                    title="Discard Changes?"
                    closeHandler={() => handleDiscard()}
                    confirmHandler={() => handleDiscard(true)}
                />
            )}

            <ToolBar handleDiscard={() => handleDiscard()} />
            <EditorForm
                {...{
                    handleChange,
                    handleEventDetailsInput,
                    handleImageInput,
                }}
            />
        </div>
    );
};

export default EventEditor;
