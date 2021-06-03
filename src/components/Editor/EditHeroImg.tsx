import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useSaveHeroImageMutation } from '../../lib/generated/graphql-frontend';
import { imageToDataURL } from '../../lib/utils';

import { Button } from '../Common/Button';
import { InputMessage } from '../Common/InputMessage';
import { DiscardModal } from './DiscardModal';
const assetURL = process.env.NEXT_PUBLIC_ASSETS_URL;

interface EditHeroImg {
    id: string;
    heroImg: string;
    submitHandler: () => void;
    cancelHandler: () => void;
}

export const EditHeroImg = ({
    heroImg,
    id,
    submitHandler,
    cancelHandler,
}: EditHeroImg) => {
    const [discardWarning, setDiscardWarning] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const imageSrc = heroImg ? `${assetURL}${heroImg}` : undefined;
    const [src, setSrc] = useState<string | undefined>(imageSrc);
    const [file, setFile] = useState<File>();
    const [uploadImage] = useSaveHeroImageMutation();

    const handleInput = async ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { files } = target;
        if (!files || !files[0]) return;
        const file = files[0];
        try {
            const dataURL = await imageToDataURL(file);
            setFile(file);
            setSrc(dataURL);
        } catch ({ error }) {
            setError(error);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) return;
        const res = await uploadImage({ variables: { file, id } });
        if (res.data) {
            submitHandler();
        } else {
            // TODO Handle Error
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="my-2">
                    <label className="flex flex-col mt-1 w-max overflow-hidden relative mx-auto">
                        <input
                            className="absolute -top-full"
                            type="file"
                            accept="image/*"
                            onChange={handleInput}
                        ></input>
                        <span className="bg-blueGray-400 px-2 py-1 w-max rounded hover:bg-blueGray-300 cursor-pointer">
                            Upload Image
                        </span>
                        {error && (
                            <InputMessage type="error">{error}</InputMessage>
                        )}
                    </label>
                    {src ? <Image src={src} /> : null}
                </div>
                <div className="flex flex-row justify-end -mr-4 py-2">
                    <Button
                        name="Discard Changes"
                        color="red"
                        onClick={() => setDiscardWarning(true)}
                        type="button"
                    />
                    <Button name="Save" color="green" type="submit" />
                </div>
            </form>
            {discardWarning && (
                <DiscardModal
                    title="Discard Changes to Hero Image?"
                    closeHandler={() => setDiscardWarning(false)}
                    confirmHandler={cancelHandler}
                />
            )}
        </div>
    );
};

const Image = ({ src }: { src: string }) => {
    return (
        <div className="w-full max-h-56 overflow-y-auto">
            <img src={src} alt="hero image" />
        </div>
    );
};
