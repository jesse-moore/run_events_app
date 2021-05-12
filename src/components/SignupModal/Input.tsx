import { ChangeEventHandler, FocusEventHandler } from 'react'
import { InputMessage } from '../InputMessage'

interface InputProps {
    errors: string[] | null
    name: string
    passwordMatch?: boolean
    info?: string
    text?: string
    touched: boolean
    type: string
    value: string
    onBlur: FocusEventHandler<HTMLInputElement>
    onChange: ChangeEventHandler<HTMLInputElement>
}

const untouchedClass = 'border-gray-300'
const validClass = 'border-green-500 bg-green-300 bg-opacity-30'
const invalidClass = 'border-red-700 bg-red-300 bg-opacity-30'

export const Input = ({
    errors,
    name,
    info,
    text = name,
    touched,
    type,
    value,
    onBlur,
    onChange,
}: InputProps) => {
    let className = untouchedClass
    if (touched && errors) className = invalidClass
    if (!errors) className = validClass
    return (
        <label className="block">
            <span className="text-gray-700">{text}</span>
            <input
                type={type}
                name={name}
                value={value}
                className={`${className} mt-1 block w-full rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                required
                onBlur={onBlur}
                onChange={onChange}
            />
            {info && <InputMessage type="info">{info}</InputMessage>}
            {errors &&
                touched &&
                errors.map((error) => {
                    return (
                        <InputMessage type="error" key={error}>
                            {error}
                        </InputMessage>
                    )
                })}
        </label>
    )
}
