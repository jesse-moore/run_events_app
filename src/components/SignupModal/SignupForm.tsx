import { ChangeEventHandler, FocusEventHandler, FormEventHandler } from 'react'
import { initialState } from './reducer'
import { Input } from './Input'
interface SignupFormProps {
    state: typeof initialState
    handleBlur: FocusEventHandler<HTMLInputElement>
    handleChange: ChangeEventHandler<HTMLInputElement>
    handleSubmit: FormEventHandler<HTMLFormElement>
}

export const SignupForm = ({
    state,
    handleSubmit,
    handleBlur,
    handleChange,
}: SignupFormProps) => {
    const { email, password, password2, errors, touched, isValid } = state
    return (
        <div className="px-6 py-2">
            <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
                <Input
                    {...{
                        errors: errors.email,
                        name: 'Email',
                        touched: touched.email,
                        type: 'email',
                        value: email,
                        onBlur: handleBlur,
                        onChange: handleChange,
                    }}
                />
                <Input
                    {...{
                        errors: errors.password,
                        name: 'Password',
                        touched: touched.password,
                        type: 'password',
                        info:
                            'Password must be at least 8 characters and have at least one lowercase character, one uppercase character, one number, and one special character',
                        value: password,
                        onBlur: handleBlur,
                        onChange: handleChange,
                    }}
                />
                <Input
                    {...{
                        errors: errors.password2,
                        name: 'Password2',
                        text: 'Reenter Password',
                        touched: touched.password2,
                        type: 'password',
                        value: password2,
                        onBlur: handleBlur,
                        onChange: handleChange,
                    }}
                />
                <div className="flex flew-row justify-center mb-4">
                    <button
                        className={`${
                            isValid ? 'bg-blue-400 ' : 'bg-gray-400 '
                        }focus:outline-none rounded-md py-2 px-3 w-48`}
                        type="submit"
                    >
                        Signup
                    </button>
                </div>
            </form>
        </div>
    )
}
