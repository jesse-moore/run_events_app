import { createSlice } from '@reduxjs/toolkit'
import { UserDataInterface } from '../../../types'

const initialState = {
    user: null,
}

const reducers = {
    signin: (
        state: userState,
        action: { payload: UserDataInterface | null }
    ) => {
        state.user = action.payload
    },
    signout: (state: userState) => {
        state.user = null
    },
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers,
})

export const { signin, signout } = userSlice.actions

export default userSlice.reducer
export const userInitialState = initialState
export type userState = typeof initialState | { user: UserDataInterface }
