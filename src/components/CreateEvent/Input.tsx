import { ChangeEventHandler } from 'react'

interface InputInterface {
    name: string
    type?: string
    title: string
    value: any
    handleChange: ChangeEventHandler<HTMLInputElement>
}

export const Input = ({
    name,
    type = 'text',
    title,
    value,
    handleChange,
}: InputInterface) => {
    return (
        <div className="my-2">
            <label className="block">
                <span className="text-gray-700">{title}</span>
                <input
                    className="mt-1 block w-96 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    name={name}
                    value={value}
                    type={type}
                    onChange={handleChange}
                ></input>
            </label>
        </div>
    )
}
