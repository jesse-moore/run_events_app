import React, {
    ChangeEvent,
    FormEvent,
    FormEventHandler,
    MouseEventHandler,
    useEffect,
    useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../../lib/redux/reducers/raceEditor';
import { RaceEditorState } from '../../../types';

export const MarkerOptions = () => {
    const [type, setType] = useState<string>();
    const [amenities, setAmenities] = useState<string[]>([]);
    const dispatch = useDispatch();
    const state = useSelector(
        (state: RaceEditorState) => state.race.modals.markerOptions
    );

    useEffect(() => {
        if (!state.marker) return;
        setType(state.marker.properties.type);
        setAmenities(state.marker.properties.amenities.split(','));
    }, []);

    const handleAmenitiesSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const items = e.target.selectedOptions;
        const selectedOptions = [];
        for (let i = 0; i < items.length; i++) {
            const item = items.item(i);
            if (!item) continue;
            selectedOptions.push(item.value);
        }
        setAmenities(selectedOptions);
    };

    const handleRemove = () => {
        if (!state.marker) {
            dispatch(actions.closeMarkerOptionsModal());
        } else {
            dispatch(actions.removeMarker(state.marker.properties.id));
            dispatch(actions.closeMarkerOptionsModal());
        }
    };

    const handleCancel = () => {
        if (state.marker && !state.marker.properties.type) {
            dispatch(actions.removeMarker(state.marker.properties.id));
        }
        dispatch(actions.closeMarkerOptionsModal());
    };

    const handleSave = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!state.marker || !type) return;
        const amenitiesString = amenities.join(',');
        console.log(type, amenitiesString);
        dispatch(
            actions.updateMarker({
                amenities: amenitiesString,
                type,
                id: state.marker.properties.id,
            })
        );
        dispatch(actions.closeMarkerOptionsModal());
    };

    const isSelected = (item: string): boolean => {
        if (!state.marker) return false;
        return amenities.includes(item);
    };

    return (
        <div className="absolute z-20 top-0 h-full w-full">
            <div
                className="absolute bg-blueGray-100 py-2 px-3 rounded shadow"
                style={{
                    left: `${state.position.x - 150}px`,
                    top: `${state.position.y + 10}px`,
                }}
            >
                <h3>Marker Options</h3>
                <form onSubmit={handleSave}>
                    <label className="block">
                        <div className="text-gray-700 mb-1">Type</div>
                        <select
                            name="markerType"
                            className="w-full"
                            onChange={(e) => setType(e.target.value)}
                            value={type}
                            required
                        >
                            <option value="">Not Selected</option>
                            <option value="Aid Station">Aid Station</option>
                            <option value="Restroom">Restroom</option>
                        </select>
                    </label>
                    <label className="block">
                        <div className="text-gray-700 mb-1">Amenities</div>
                        <select
                            name="amenities"
                            className="w-full"
                            multiple
                            onChange={handleAmenitiesSelect}
                        >
                            <option value="Food" selected={isSelected('Food')}>
                                Food
                            </option>
                            <option
                                value="Water"
                                selected={isSelected('Water')}
                            >
                                Water
                            </option>
                        </select>
                    </label>
                    <Button name="Save" color="bg-green" type="submit" />
                </form>
                <Button
                    name="Cancel"
                    color="bg-orange"
                    clickHandler={handleCancel}
                />
                <Button
                    name="Remove"
                    color="bg-red"
                    clickHandler={handleRemove}
                />
            </div>
        </div>
    );
};

interface ButtonProps {
    color?: string;
    name: string;
    clickHandler?: MouseEventHandler;
    type?: 'button' | 'reset' | 'submit';
}

const Button = ({
    color = 'bg-gray',
    name,
    clickHandler,
    type = 'button',
}: ButtonProps) => {
    return (
        <button
            className={`${color}-400 transition-colors duration-200 px-5 py-2 my-1 rounded-md w-full font-medium text-base hover:${color}-500 focus:outline-none active:${color}-600`}
            onClick={clickHandler}
            type={type}
        >
            {name}
        </button>
    );
};
