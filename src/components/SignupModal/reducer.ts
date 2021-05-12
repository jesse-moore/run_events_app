interface Action {
    type: string
    payload?: any
}

interface InitialState {
    email: string
    password: string
    password2: string
    errors: {
        email: string[] | null
        password: string[] | null
        password2: string[] | null
    }
    touched: { email: boolean; password: boolean; password2: boolean }
    isValid: boolean
}

export const initialState: InitialState = {
    email: '',
    password: '',
    password2: '',
    errors: { email: [], password: [], password2: [] },
    touched: { email: false, password: false, password2: false },
    isValid: false,
}

// export const initialState: InitialState = {
//     email: 'test@example.com',
//     password: 'Password1!',
//     password2: 'Password1!',
//     errors: { email: [], password: [], password2: [] },
//     touched: { email: false, password: false, password2: false },
//     isValid: false,
// }

export const reducer = (
    state: typeof initialState,
    action: Action
): typeof initialState => {
    const { type, payload } = action
    switch (type) {
        case 'setEmail':
            return { ...state, email: payload }
        case 'setPassword':
            return { ...state, password: payload }
        case 'setPassword2':
            return { ...state, password2: payload }
        case 'setEmailTouched':
            return { ...state, touched: { ...state.touched, email: true } }
        case 'setPasswordTouched':
            return { ...state, touched: { ...state.touched, password: true } }
        case 'setPassword2Touched':
            return { ...state, touched: { ...state.touched, password2: true } }
        case 'setErrors':
            return { ...state, errors: payload }
        case 'setFormIsValid':
            return { ...state, isValid: payload }

        default:
            return state
    }
}
