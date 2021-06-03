import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import { toggleSignupForm, toggleLoginForm } from '../../lib/redux/reducers/ui';
import { signout } from '../../lib/redux/reducers/user';
import { logout } from '../../lib/cognito';
import { apolloClient } from '../../lib/graphql/apollo';
import { UserDataInterface } from '../../types';
import { Button } from './Button';
import { Dispatch } from 'react';
import { ButtonLink } from './ButtonLink';
import { RootState } from '../../lib/redux/reducers';

export const NarBar = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.user);

    const handleLogout = () => {
        logout();
        dispatch(signout());
        apolloClient?.clearStore();
        Router.push('/');
    };

    return (
        <div className="w-full py-2 px-4 flex flex-row items-center bg-white sticky top-0 z-20">
            <Link href="/">
                <div className="mr-auto">LOGO</div>
            </Link>

            <a href="/events">
                <Button name="Events" />
            </a>
            {user ? (
                <AuthenticatedUserNavLinks handleLogout={handleLogout} />
            ) : (
                <UnauthenticatedUserNavLinks dispatch={dispatch} />
            )}
        </div>
    );
};

const AuthenticatedUserNavLinks = ({ handleLogout }: { handleLogout: any }) => {
    return (
        <>
            <Button name="Logout" onClick={() => handleLogout()} />
            <Link href="/app" passHref>
                <ButtonLink name="Go to console" color="blue" />
            </Link>
        </>
    );
};

const UnauthenticatedUserNavLinks = ({
    dispatch,
}: {
    dispatch: Dispatch<any>;
}) => {
    return (
        <>
            <Button name="Login" onClick={() => dispatch(toggleLoginForm())} />
            <Button
                name="Signup"
                color="blue"
                onClick={() => dispatch(toggleSignupForm())}
            />
        </>
    );
};
