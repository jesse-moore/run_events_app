import { FormEvent, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import Router from 'next/router';

import { useCreateUserMutation } from '../../lib/generated/graphql-frontend';
import { validateForm } from '../../lib/validation';
import { signup, login, getUser } from '../../lib/cognito';
import { toggleSignupForm } from '../../lib/redux/reducers/ui';
import { signin } from '../../lib/redux/reducers/user';

import { LoadingOverlay } from '../Common/LoadingOverlay';
import { SignupForm } from './SignupForm';
import { reducer, initialState } from './reducer';
import { Modal } from '../Common/Modal';
import { LoadingBar } from '../Common/LoadingBar';

export function SignupModal() {
    const [createUser, { data }] = useCreateUserMutation();
    const dispatch = useDispatch();
    const [state, dispatchLocal] = useReducer(reducer, initialState);
    const [loading, setLoading] = useState(false);
    const [loadingState, setLoadingState] = useState('');

    const handleChange = ({ target }: { target: HTMLInputElement }) => {
        const { value, name } = target;
        const { email, password, password2 } = state;
        const form = { email, password, password2 };
        Object.defineProperty(form, name.toLowerCase(), { value });
        const { errors, isValid } = validateForm(form);
        dispatchLocal({ type: `set${name}`, payload: value });
        dispatchLocal({ type: 'setErrors', payload: errors });
        dispatchLocal({ type: 'setFormIsValid', payload: isValid });
    };

    const handleBlur = ({ target }: { target: HTMLInputElement }) => {
        const { name } = target;
        dispatchLocal({ type: `set${name}Touched` });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!state.isValid) return;
        const { email, password } = state;
        setLoading(true);
        try {
            setLoadingState('Signing Up');
            await signup({ email, password })
            setLoadingState('Logging In');
            await login({ email, password });
            const user = await getUser();
            await createUser();
            dispatch(signin(user));
            handleClose();
            Router.push('/app');
        } catch (err) {
            // TODO Handle signup error
            console.log(err);
        }
    };

    const handleClose = () => {
        dispatch(toggleSignupForm());
    };
    return (
        <Modal
            title="Signup"
            closeHandler={handleClose}
            loadingOverlay={
                loading && (
                    <LoadingOverlay>
                        <div className="text-4xl mb-2">{loadingState}</div>
                        <LoadingBar />
                    </LoadingOverlay>
                )
            }
        >
            <SignupForm
                {...{
                    state,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                }}
            />
        </Modal>
    );
}
