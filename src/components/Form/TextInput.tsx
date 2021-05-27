import { ChangeEventHandler } from 'react';
import { Input } from './Input';
interface TextInput {
    name: string;
    type?: string;
    title: string;
    value: any;
    handleChange: ChangeEventHandler<HTMLInputElement>;
}

export const TextInput = ({
    name,
    type = 'text',
    title,
    value,
    handleChange,
}: TextInput) => {
    return <Input {...{ title, name, type, value, handleChange }} />;
};
