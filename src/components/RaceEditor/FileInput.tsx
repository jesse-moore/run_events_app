import React from 'react';

interface FileInputInterface {
    handleInput: any;
}

export const FileInput = ({ handleInput }: FileInputInterface) => {
    // const { error, src, name } = image;
    return (
        <>
            <div className="my-2 max-w-max mx-auto">
                <span className="text-gray-700">GPX File Upload</span>
                <label className="flex flex-col mt-1 w-max overflow-hidden relative">
                    <input
                        className="absolute -top-full"
                        type="file"
                        accept=".gpx"
                        onChange={handleInput}
                    ></input>
                    <span className="bg-blueGray-400 px-2 py-1 w-max rounded hover:bg-blueGray-300 cursor-pointer">
                        Upload File
                    </span>
                    {/* {error && <InputMessage type="error">{error}</InputMessage>} */}
                </label>
            </div>
        </>
    );
};
