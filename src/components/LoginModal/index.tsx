import React, { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleLoginForm } from '../../lib/redux/reducers/ui'
import { signin } from '../../lib/redux/reducers/user'
import { login, getUser } from '../../lib/cognito'
import Router from 'next/router'
import { Modal } from '../Modal'
import { LoadingOverlay } from '../common/LoadingOverlay'
import { LoadingBar } from '../common/LoadingBar'
import { LoginForm } from './LoginForm'

export function LoginModal() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!email || !password) return
        try {
            setLoading(true)
            await login({ email, password })
            const user = await getUser()
            dispatch(signin(user))
            handleClose()
            Router.push('/app')
        } catch {
            // TODO Login Failed
        }
    }

    const handleChange = ({ target }: { target: HTMLInputElement }) => {
        const { name, value } = target
        if (name === 'email') setEmail(value)
        if (name === 'password') setPassword(value)
    }

    const handleClose = () => {
        dispatch(toggleLoginForm())
    }

    return (
        <Modal
            title="Login"
            closeHandler={handleClose}
            loadingOverlay={
                loading && (
                    <LoadingOverlay>
                        <div className="text-4xl mb-2">Logging In</div>
                        <LoadingBar />
                    </LoadingOverlay>
                )
            }
        >
            <LoginForm {...{ email, password, handleChange, handleSubmit }} />
        </Modal>
    )
}

export default LoginModal
