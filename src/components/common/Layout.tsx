import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { getUser } from '../../lib/cognito';
import { RootState } from '../../lib/redux/reducers';
import { signin } from '../../lib/redux/reducers/user';
import { LoginModal } from '../LoginModal';
import { NarBar } from './NarBar';
import { SignupModal } from '../SignupModal';
import { UserDataInterface } from '../../types';

interface LayoutProps {
    children: ReactNode;
    authenticatedRoute?: boolean;
    redirectAuthenticated?: string;
}

export const Layout = ({
    children,
    authenticatedRoute,
    redirectAuthenticated,
}: LayoutProps) => {
    const [user, setUser] = useState<UserDataInterface | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        const init = async () => {
            const user = await getUser();
            if (user) dispatch(signin(user));
            setUser(user);
            if (!user && authenticatedRoute) {
                return Router.push('/');
            }
            if (user && redirectAuthenticated) {
                return Router.replace(redirectAuthenticated);
            }
            setIsLoaded(true);
        };
        init();
    }, []);
    const { modals } = useSelector((state: RootState) => state.ui);
    if (!user && authenticatedRoute) return null;
    return (
        <div className="relative flex flex-col min-h-screen">
            <NarBar />
            <div className="bg-blueGray-100 flex-grow">
                {isLoaded && children}
            </div>
            <footer className="text-center flex items-center justify-center py-6">
                {/* <div>FOOTER</div> */}
            </footer>
            {modals.signupForm ? <SignupModal /> : null}
            {modals.loginForm ? <LoginModal /> : null}
        </div>
    );
};
