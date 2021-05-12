interface Errors {
    email: string[] | null
    password: string[] | null
    password2: string[] | null
}

interface FormValidationResult {
    errors: Errors
    isValid: boolean
}

interface FormValues {
    email: string
    password: string
    password2: string
}

export const validateForm = (form: FormValues): FormValidationResult => {
    const { email, password, password2 } = form
    const emailErrors = validateEmail(email)
    const passwordErrors = validatePassword(password)
    let password2Errors = validatePassword(password2)

    if (password !== password2) {
        if (password2Errors !== null) {
            password2Errors?.push('Passwords do not match')
        } else {
            password2Errors = ['Passwords do not match']
        }
    }

    const errors = {
        email: emailErrors,
        password: passwordErrors,
        password2: password2Errors,
    }
    const isValid = isValidForm(errors)
    return { errors, isValid }
}

const validateEmail = (email: string): string[] | null => {
    const errors = []
    if (!/^[^@]+@\S*$/.test(email)) {
        errors.push("Please include an '@' in the email address.")
    }
    if (!/^[^@]+@\S+$/.test(email)) {
        errors.push("Please enter a part following '@'.")
    }
    if (!/^[^@]+@[^@]*$/.test(email)) {
        errors.push("A part following '@' should not contain the symbol '@'")
    }
    if (!/^.+[^\.]$/.test(email)) {
        errors.push("Email address cannot end with a '.'")
    }
    if (errors.length > 0) return errors
    if (!/^[^@]+@\w+(\.\w+)+\w$/.test(email)) {
        errors.push('Invalid email address')
        return errors
    }
    return null
}

export const validatePassword = (password: string): string[] | null => {
    const errors = []
    const passordLength = password.length >= 8
    const specialRegex = /([=+\-^$*.[\]{}()?"!@#%&/\\,><':;|_~`])/
    const passwordSpecial = specialRegex.test(password)
    const passwordUpper = /[A-Z]/.test(password)
    const passwordLower = /[a-z]/.test(password)
    const passwordNumber = /[0-9]/.test(password)

    if (!passordLength) {
        errors.push('Password must be at least 8 characters long.')
    }
    if (!passwordSpecial) {
        errors.push('Password must contain a special character')
    }
    if (!passwordUpper) {
        errors.push('Password must contain an uppercase character')
    }
    if (!passwordLower) {
        errors.push('Password must contain a lowercase character')
    }
    if (!passwordNumber) {
        errors.push('Password must contain a number')
    }

    return errors.length ? errors : null
}

export const isValidForm = (errors: Errors): boolean => {
    if (errors.email !== null) return false
    if (errors.password !== null) return false
    if (errors.password2 !== null) return false
    return true
}
