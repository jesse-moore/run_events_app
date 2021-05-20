import React from 'react';
import { InputMessage } from '../Common/InputMessage';
import { HeroImg } from '../../types';

interface ImageInputInterface {
    image: HeroImg;
    handleInput: any;
}

export const ImageInput = ({ image, handleInput }: ImageInputInterface) => {
    const { error, src, name } = image;
    return (
        <>
            <div className="my-2">
                <span className="text-gray-700">Image</span>
                <label className="flex flex-col mt-1 w-max overflow-hidden relative">
                    <input
                        className="absolute -top-full"
                        type="file"
                        accept="image/*"
                        onChange={handleInput}
                    ></input>
                    <span className="bg-blueGray-400 px-2 py-1 w-max rounded hover:bg-blueGray-300 cursor-pointer">
                        {image ? 'Upload New Image' : 'Upload Image'}
                    </span>
                    {error && <InputMessage type="error">{error}</InputMessage>}
                </label>
            </div>

            {src && name && (
                <div>
                    <div>{image.name}</div>
                    <div className="w-96 max-h-56 overflow-y-auto">
                        <img src={src} alt={name} />
                    </div>
                </div>
            )}
        </>
    );
};
