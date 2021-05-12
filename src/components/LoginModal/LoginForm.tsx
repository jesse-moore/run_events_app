import { ChangeEventHandler, FormEventHandler } from 'react'

interface LoginFormProps {
    email: string
    password: string
    handleChange: ChangeEventHandler<HTMLInputElement>
    handleSubmit: FormEventHandler<HTMLFormElement>
}

export function LoginForm({
    email,
    password,
    handleChange,
    handleSubmit,
}: LoginFormProps) {
    return (
        <div className="px-6 py-2">
            <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
                <label className="block">
                    <span className="text-gray-700">Email</span>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        className="border-gray-300 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                        onChange={handleChange}
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Password</span>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        className="border-gray-300 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                        minLength={6}
                        onChange={handleChange}
                    />
                </label>
                <div className="flex flew-row justify-center mb-4">
                    <button
                        className="focus:outline-none bg-blue-400 rounded-md py-2 px-3 w-48"
                        type="submit"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}
