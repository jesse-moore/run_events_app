import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useComponentFocused } from '../../helpers/useComponentFocused';
import { EventActionInterface } from '../../types';

interface DateInputProps {
    date: string;
    dispatch: React.Dispatch<EventActionInterface>;
}

export const DateInput = ({ date, dispatch }: DateInputProps) => {
    const [focused, setFocused] = useState(false);
    const dateString = dayjs(date).format('dddd MMMM DD, YYYY');
    return (
        <div className="h-8 w-400">
            {focused ? (
                <DateInputElement
                    date={date}
                    dispatch={dispatch}
                    setFocused={setFocused}
                />
            ) : (
                <DateElement dateString={dateString} setFocused={setFocused} />
            )}
        </div>
    );
};

interface DateElementProps {
    dateString: string;
    setFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

const DateElement = ({ dateString, setFocused }: DateElementProps) => {
    return (
        <div
            className="text-xl text-center font-semibold bg-transparent"
            onClick={() => setFocused(true)}
        >
            {dateString}
        </div>
    );
};

interface DateInputElementProps {
    date: string;
    setFocused: React.Dispatch<React.SetStateAction<boolean>>;
    dispatch: React.Dispatch<EventActionInterface>;
}

const DateInputElement = ({
    date,
    dispatch,
    setFocused,
}: DateInputElementProps) => {
    const { ref, isComponentFocused } = useComponentFocused(true);

    useEffect(() => {
        setFocused(isComponentFocused);
    }, [isComponentFocused]);
    return (
        <input
            ref={ref}
            className="text-xl text-center font-semibold bg-transparent h-full border-none"
            value={dayjs(date).format('YYYY-MM-DD')}
            tabIndex={0}
            type="date"
            onChange={({ target }) =>
                dispatch({ type: 'updateDate', payload: target.value })
            }
        ></input>
    );
};
