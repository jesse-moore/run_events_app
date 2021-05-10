import React, { ReactNode, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Router from 'next/router'
import { getUser } from '../lib/cognito'
import { RootState } from '../lib/redux/reducers'
import { signin } from '../lib/redux/reducers/user'
import { LoginModal } from './LoginModal'
import { NarBar } from './NarBar'
import { SignupModal } from './SignupModal'

interface LayoutProps {
    children: ReactNode
    authenticatedRoute?: boolean
    redirectAuthenticated?: string
}

export const Layout = ({
    children,
    authenticatedRoute,
    redirectAuthenticated,
}: LayoutProps) => {
    const dispatch = useDispatch()
    useEffect(() => {
        const init = async () => {
            const user = await getUser()
            if (user) dispatch(signin(user))
            if (!user && authenticatedRoute) {
                return Router.push('/')
            }
            if (user && redirectAuthenticated) {
                return Router.replace(redirectAuthenticated)
            }
        }
        init()
    }, [])
    const { user } = useSelector((state: RootState) => state.user)
    const { modals } = useSelector((state: RootState) => state.ui)
    if ((!user && authenticatedRoute) || (user && redirectAuthenticated))
        return null
    return (
        <div>
            <NarBar user={user} />
            {children}
            <footer className="text-center h-24 flex justify-center items-center">
                <div>FOOTER</div>
            </footer>
            {modals.signupForm ? <SignupModal /> : null}
            {modals.loginForm ? <LoginModal /> : null}
        </div>
    )
}
