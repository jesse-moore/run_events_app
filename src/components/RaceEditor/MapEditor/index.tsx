import React from 'react';
import { useSelector } from 'react-redux';

import { EditorTools } from './EditorTools';
import { MapboxMap } from './Map';
import { Legend } from './Legend';
import { MarkerOptions } from './MarkerOptions';
import { RaceEditorState } from '../../../types';

export const MapEditor = () => {
    const state = useSelector((state: RaceEditorState) => state.race);

    const { modals } = state;
    return (
        <>
            <EditorTools tools={state.tools} />
            <div className="h-full w-full relative">
                <MapboxMap />
                <Legend />
                {modals.markerOptions.active && <MarkerOptions />}
            </div>
        </>
    );
};
