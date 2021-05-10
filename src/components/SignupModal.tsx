import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import Router from 'next/router'
import { toggleSignupForm } from '../lib/redux/reducers/ui'
import { signup } from '../lib/cognito'
import { InputMessage } from './InputMessage'
import { validate, inputState } from '../helpers/formValidation'
import { Modal } from './Modal'

export function SignupModal() {
    const dispatch = useDispatch()

    const [form, setForm] = useState({
        email: Object.assign({}, inputState),
        password: Object.assign({}, inputState),
        password2: Object.assign({}, inputState),
        passwordsMatch: false,
        isValid: false,
    })

    const handleChange = ({ target }: { target: HTMLInputElement }) => {
        const { name, value } = target
        const inputState = Object.getOwnPropertyDescriptor(form, name)?.value
        setForm({
            ...form,
            [name]: {
                ...inputState,
                value,
            },
        })
    }

    const handleValidate = ({ target }: { target: HTMLInputElement }) => {
        const newFormState = validate({ target, formValidity: form })
        setForm(newFormState)
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!form.isValid) return
        const { email, password } = form
        await signup({ email: email.value, password: password.value })
        // TODO User Confirm
        Router.push('/app')
    }

    return (
        <Modal>
            <div className="text-2xl text-center">Signup</div>
            <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
                <label className="block">
                    <span className="text-gray-700">Email</span>
                    <input
                        type="email"
                        name="email"
                        value={form.email.value}
                        className={`${form.email.class} mt-1 block w-full rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                        required
                        onBlur={handleValidate}
                        onChange={handleChange}
                    />
                    {!form.email.isValid && form.email.isTouched ? (
                        <InputMessage type="error">
                            {form.email.message}
                        </InputMessage>
                    ) : null}
                </label>
                <label className="block">
                    <span className="text-gray-700">Password</span>
                    <input
                        type="password"
                        name="password"
                        value={form.password.value}
                        className={`${form.password.class} mt-1 block w-full rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                        required
                        minLength={6}
                        onBlur={handleValidate}
                        onChange={handleChange}
                    />
                    {!form.password.isValid && form.password.isTouched ? (
                        <InputMessage type="error">
                            {form.password.message}
                        </InputMessage>
                    ) : null}
                    {!form.passwordsMatch && form.password2.isTouched ? (
                        <InputMessage type="error">
                            Passwords do not match
                        </InputMessage>
                    ) : null}
                    <InputMessage type="info">
                        must be at least 6 characters long.
                    </InputMessage>
                </label>
                <label className="block">
                    <span className="text-gray-700">Reenter Password</span>
                    <input
                        type="password"
                        name="password2"
                        value={form.password2.value}
                        onChange={handleChange}
                        onBlur={handleValidate}
                        required
                        minLength={6}
                        className={`${form.password2.class} mt-1 block w-full rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                    />
                    {!form.password2.isValid && form.password2.isTouched ? (
                        <InputMessage type="error">
                            {form.password2.message}
                        </InputMessage>
                    ) : null}
                    {!form.passwordsMatch && form.password2.isTouched ? (
                        <InputMessage type="error">
                            Passwords do not match
                        </InputMessage>
                    ) : null}
                </label>
                <div className="flex flew-row justify-end mt-4">
                    <button
                        className={`${
                            form.isValid ? 'bg-blue-400 ' : 'bg-gray-400 '
                        }w-min focus:outline-none rounded-md py-2 px-3 place-self-end mr-4`}
                        type="submit"
                    >
                        Submit
                    </button>
                    <button
                        className="w-min focus:outline-none bg-red-400 rounded-md py-2 px-3 place-self-end"
                        onClick={() => dispatch(toggleSignupForm())}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </Modal>
    )
}
