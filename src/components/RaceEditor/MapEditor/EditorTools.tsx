import React, { MouseEventHandler } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../../lib/redux/reducers/raceEditor';

interface EditorToolsProps {
    tools: { [k: string]: boolean };
}

export const EditorTools = ({ tools }: EditorToolsProps) => {
    const dispatch = useDispatch();
    return (
        <div className="mt-4 bg-blueGray-200 py-4">
            <div className="w-full flex flex-row justify-center">
                <ToolGroup onClick={() => dispatch(actions.setSelectActive())}>
                    <ToolPrimary isActive={tools.select} name="Select" />
                </ToolGroup>
                <ToolGroup
                    onClick={() => dispatch(actions.setAddMarkerActive())}
                >
                    <ToolPrimary isActive={tools.addMarker} name="Add Marker" />
                    <ToolSecondary
                        name="Undo"
                        onClick={() => dispatch(actions.undoAddMarker())}
                    />
                </ToolGroup>
                <ToolGroup
                    onClick={() => dispatch(actions.setCreateRouteActive())}
                >
                    <ToolPrimary
                        isActive={tools.createRoute}
                        name="Create Route"
                    />
                    <ToolSecondary
                        name="Undo"
                        onClick={() => console.log('UNDO ROUTE')}
                    />
                </ToolGroup>
            </div>
        </div>
    );
};

interface ToolGroupProps {
    onClick?: MouseEventHandler;
    children: React.ReactNode;
}

const ToolGroup = ({ children, onClick }: ToolGroupProps) => {
    return (
        <div
            className="mx-4 rounded-md overflow-hidden shadow"
            onClick={onClick}
        >
            {children}
        </div>
    );
};

interface ToolPrimaryInterface {
    name: string;
    onClick?: MouseEventHandler;
    isActive?: boolean;
}

export const ToolPrimary = ({
    isActive,
    name,
    onClick,
}: ToolPrimaryInterface) => {
    const bgColor = isActive ? 'bg-blue-400' : 'bg-blueGray-400';
    return (
        <button
            className={`${bgColor} transition-colors duration-200 px-5 py-2 font-medium text-base hover:bg-blue-400 focus:outline-none active:bg-blue-500`}
            onClick={onClick}
        >
            {name}
        </button>
    );
};

interface ToolSecondaryInterface {
    name: string;
    onClick?: MouseEventHandler;
    isActive?: boolean;
}

const ToolSecondary = ({ name, onClick, isActive }: ToolSecondaryInterface) => {
    const bgColor = isActive ? 'bg-blue-200' : 'bg-blueGray-300';
    return (
        <button
            className={`${bgColor} transition-colors duration-200 px-5 py-2 font-medium text-base hover:bg-blue-300 focus:outline-none active:bg-blue-500`}
            onClick={onClick}
        >
            {name}
        </button>
    );
};
