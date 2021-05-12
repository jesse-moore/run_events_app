import dayjs from 'dayjs';
import { useState } from 'react';
import { EventActionInterface } from '../../types';
import { DateInput } from './DateInput';
import { EditContainer } from './EditContainer';

interface HeroProps {
    data: {
        date: string;
        name: string;
        heroImg: string;
        address: string;
        city: string;
        state: string;
    };
    dispatch: React.Dispatch<EventActionInterface>;
}

export const Hero = ({ data, dispatch }: HeroProps) => {
    const [hover, setHover] = useState(false);
    const { date, name, heroImg, address, city, state } = data;

    return (
        <HeroImg heroImg={heroImg}>
            <EditContainer>
                <BaseInput
                    className="text-5xl text-center font-semibold"
                    value={name}
                    placeholder="Event Name"
                    action="updateName"
                    dispatch={dispatch}
                ></BaseInput>
            </EditContainer>
            <EditContainer>
                <DateInput date={date} dispatch={dispatch} />
            </EditContainer>
            <EditContainer>
                <BaseInput
                    className="text-xl py-2 text-center"
                    value={address}
                    placeholder="Address"
                    action="updateAddress"
                    dispatch={dispatch}
                ></BaseInput>
            </EditContainer>
            <EditContainer>
                <BaseInput
                    className="text-xl py-2 text-center min-w-max"
                    value={address}
                    placeholder="Address"
                    action="updateAddress"
                    dispatch={dispatch}
                ></BaseInput>
                {','}
                <BaseInput
                    className="text-xl py-2 text-center"
                    value={address}
                    placeholder="Address"
                    action="updateAddress"
                    dispatch={dispatch}
                ></BaseInput>
            </EditContainer>
            <div className="text-xl">{`${city}, ${state}`}</div>
        </HeroImg>
    );
};

interface BaseInputInterface {
    className?: string;
    value: string;
    placeholder?: string;
    action: string;
    dispatch: React.Dispatch<EventActionInterface>;
}

const BaseInput = ({
    className,
    value,
    placeholder,
    action,
    dispatch,
}: BaseInputInterface) => {
    const baseClass =
        'bg-transparent border-none p-0 focus:border-none focus:outline-none hover:border hover:border-gray-600';
    return (
        <input
            className={`${baseClass} ${className}`}
            value={value}
            type="text"
            placeholder={placeholder}
            onChange={({ target }) =>
                dispatch({ type: action, payload: target.value })
            }
        ></input>
    );
};

interface HeroImgProps {
    heroImg: string;
    children: JSX.Element[] | JSX.Element;
}

const HeroImg = ({ heroImg, children }: HeroImgProps) => {
    if (!heroImg) {
        const opacity = 0.6;
        const rgbTop = 50;
        const rgbBottom = 100;
        const overlayTop = `rgba(${rgbTop}, ${rgbTop}, ${rgbTop}, ${opacity})`;
        const overlayBottom = `rgba(${rgbBottom}, ${rgbBottom}, ${rgbBottom}, ${opacity})`;
        return (
            <div
                className="rounded-sm h-80 text-center pt-4 text-gray-200"
                style={{
                    background: `linear-gradient(${overlayTop}, ${overlayBottom})`,
                }}
            >
                {children}
            </div>
        );
    } else {
        const opacity = 0.6;
        const rgb = 50;
        const overlay = `rgba(${rgb}, ${rgb}, ${rgb}, ${opacity})`;
        const backgroundStyle = `linear-gradient(${overlay}, ${overlay}),
		url(${heroImg}) center center`;
        return (
            <div
                className="rounded-sm h-80 text-center pt-4 text-gray-200"
                style={{ background: backgroundStyle }}
            >
                {children}
            </div>
        );
    }
};
