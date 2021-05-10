import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleLoginForm } from '../lib/redux/reducers/ui'
import { signin } from '../lib/redux/reducers/user'
import { login, getUser } from '../lib/cognito'
import Router from 'next/router'
import { Modal } from './Modal'

export function LoginModal() {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!email || !password) return
        try {
            await login({ email, password })
            const user = await getUser()
            dispatch(signin(user))
            dispatch(toggleLoginForm())
            Router.push('/app')
        } catch {
            // TODO Login Failed
        }
    }

    return (
        <Modal>
            <div className="text-2xl text-center">Login</div>
            <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
                <label className="block">
                    <span className="text-gray-700">Email</span>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        className="border-gray-300 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                        onChange={({ target }) => setEmail(target.value)}
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
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </label>
                <div className="flex flew-row justify-end mt-4">
                    <button
                        className="w-min focus:outline-none bg-blue-400 rounded-md py-2 px-3 place-self-end mr-4"
                        type="submit"
                    >
                        Submit
                    </button>
                    <button
                        className="w-min focus:outline-none bg-red-400 rounded-md py-2 px-3 place-self-end"
                        onClick={() => dispatch(toggleLoginForm())}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </Modal>
    )
}
