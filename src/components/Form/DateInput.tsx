import { ChangeEventHandler } from 'react';
import { Input } from './Input';
interface DateInput {
    name: string;
    title: string;
    value: any;
    handleChange: ChangeEventHandler<HTMLInputElement>;
}

export const DateInput = ({ name, title, value, handleChange }: DateInput) => {
    return <Input {...{ title, name, type: 'date', value, handleChange }} />;
};
