type InputState = {
    value: string;
    isValid: boolean;
    isTouched: boolean;
    class: string;
    message: string | null;
};

export type FormState = {
    email: InputState;
    password: InputState;
    password2: InputState;
    passwordsMatch: boolean;
    isValid: boolean;
};

const untouchedClass = 'border-gray-300';
const validClass = 'border-green-500 bg-green-300 bg-opacity-30';
const invalidClass = 'border-red-700 bg-red-300 bg-opacity-30';

export const inputState: InputState = {
    value: '',
    isValid: false,
    isTouched: false,
    class: untouchedClass,
    message: null,
};

export const validate = ({
    target,
    formValidity,
}: {
    target: HTMLInputElement;
    formValidity: FormState;
}): FormState => {
    const { name, validationMessage, validity } = target;
    const validState = {
        isValid: true,
        isTouched: true,
        class: validClass,
        message: '',
    };
    const invalidState = {
        isValid: false,
        isTouched: true,
        class: invalidClass,
        message: validationMessage,
    };
    let newFormState: typeof formValidity = Object.assign({}, formValidity);
    let inputState: InputState = Object.getOwnPropertyDescriptor(
        newFormState,
        name
    )?.value;
    if (!inputState) return newFormState;
    if (validity.valid) {
        inputState = { ...inputState, ...validState };
        newFormState = { ...newFormState, [name]: inputState };
    } else {
        inputState = { ...inputState, ...invalidState };
        newFormState = { ...newFormState, [name]: inputState };
    }
    if (
        newFormState.password.value !== newFormState.password2.value &&
        newFormState.password.isTouched &&
        newFormState.password2.isTouched
    ) {
        newFormState.passwordsMatch = false;
        newFormState.password.class = invalidClass;
        newFormState.password2.class = invalidClass;
    } else {
        newFormState.passwordsMatch = true;
        if (newFormState.password.isValid) {
            newFormState.password.class = validClass;
        }
        if (newFormState.password2.isValid) {
            newFormState.password2.class = validClass;
        }
    }
    let newIsValid = true;
    for (const key in newFormState) {
        if (!newFormState.passwordsMatch) {
            newIsValid = false;
            break;
        }
        const element = newFormState[key as keyof FormState];
        if (typeof element !== 'boolean') {
            if (!element.isValid) {
                newIsValid = false;
                break;
            }
        }
    }
    return { ...newFormState, isValid: newIsValid };
};
