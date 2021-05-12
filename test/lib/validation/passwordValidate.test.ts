import { validatePassword } from '../../../src/lib/validation'

describe('passwordValidate', () => {
    it('Invaildates password less than 8 characters', async () => {
        const errors = validatePassword('abc')
        expect(errors).toContain('Password must be at least 8 characters long.')
    })
    it('Invaildates password without a special character', async () => {
        const errors = validatePassword('abcdsSDd2335345')
        expect(errors).toContain('Password must contain a special character')
    })
    it('Invaildates password without an uppercase character', async () => {
        const errors = validatePassword('abcdsd233#$#$5345')
        expect(errors).toContain('Password must contain an uppercase character')
    })
    it('Invaildates password without a lowercase character', async () => {
        const errors = validatePassword('ADSDFF2335@#$#$345')
        expect(errors).toContain('Password must contain a lowercase character')
    })
    it('Invaildates password without a number', async () => {
        const errors = validatePassword('abcdsdDFDF@@$')
        expect(errors).toContain('Password must contain a number')
    })
    it('Vaildates a correct password', async () => {
        const errors = validatePassword('abcd123sdDFDF@@$')
        expect(errors).toBeFalsy()
    })
})
