import React from 'react';

export const Legend = () => {
    return (
        <div className="bg-white rounded absolute top-3 left-3 p-2 shadow z-10 ">
            <h4 className="mb-2 font-semibold">Legend</h4>
            <div className="flex flex-row items-center">
                <div
                    className="rounded-full h-5 w-5 mr-2"
                    style={{
                        backgroundColor: '#A3E635',
                        border: '#4D7C0F 2px solid',
                    }}
                ></div>
                <div>Start / Finish</div>
            </div>
            <div className="flex flex-row items-center">
                <div
                    className="rounded-full h-5 w-5 mr-2"
                    style={{
                        backgroundColor: '#BFDBFE',
                        border: '#1E3A8A 2px solid',
                    }}
                ></div>
                <div>Aid Station Level 1</div>
            </div>
            <div className="flex flex-row items-center">
                <div
                    className="rounded-full h-5 w-5 mr-2"
                    style={{
                        backgroundColor: '#C4B5FD',
                        border: '#5B21B6 2px solid',
                    }}
                ></div>
                <div>Aid Station Level 2</div>
            </div>
            <div className="flex flex-row items-center">
                <div
                    className="rounded-full h-5 w-5 mr-2"
                    style={{
                        backgroundColor: '#FDBA74',
                        border: '#9A3412 2px solid',
                    }}
                ></div>
                <div>Restroom</div>
            </div>
        </div>
    );
};
