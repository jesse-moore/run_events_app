import React, { ChangeEventHandler, FocusEventHandler } from 'react';
import { InputMessage } from '../Common/InputMessage';

interface URLInput {
    name: string;
    type?: string;
    title: string;
    value: any;
    required?: boolean;
    error?: string;
    step?: number;
    handleChange: ChangeEventHandler<HTMLInputElement>;
    handleBlur?: FocusEventHandler<HTMLInputElement>;
}

export const URLInput = ({
    name,
    type = 'text',
    title,
    value,
    error,
    required,
    handleChange,
    handleBlur,
}: URLInput) => {
    const errorClass = error ? 'border-red-500 bg-red-100 ' : '';
    return (
        <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-700">
                {title}
            </label>

            <div className="relative">
                <div className="absolute flex border border-transparent right-0 top-0 h-full">
                    <div className="flex items-center justify-center rounded-tr rounded-br bg-gray-200 text-gray-600 text-xl h-full w-full pr-8 pl-1">
                        .rmap.site
                    </div>
                </div>

                <input
                    className={`${errorClass}block w-full rounded shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                    name={name}
                    value={value}
                    type={type}
                    onChange={handleChange}
                    required={required}
                    maxLength={50}
                    onBlur={handleBlur}
                />
            </div>
            <InputMessage type="info">
                <span className="text-base">Characters a-z, 0-9, -, _</span>
            </InputMessage>
            {error && (
                <InputMessage type="error">
                    <span className="text-base">{error}</span>
                </InputMessage>
            )}
        </div>
    );
};
