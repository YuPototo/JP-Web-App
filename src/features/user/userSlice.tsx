import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'
import { userApi } from './userService'

export interface UserSliceState {
    token: string | null
    displayId: string | null
}

const initialState: UserSliceState = {
    token: null,
    displayId: null,
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        userLoggedIn: (
            state,
            { payload }: PayloadAction<{ token: string; displayId: string }>,
        ) => {
            state.token = payload.token
            state.displayId = payload.displayId
        },
        userLoggedOut: (state) => {
            state.token = null
            state.displayId = null
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            userApi.endpoints.login.matchFulfilled,
            (state, { payload }) => {
                state.token = payload.token
                state.displayId = payload.user.displayId
            },
        )
    },
})

export const { userLoggedIn, userLoggedOut } = userSlice.actions

/* selectors */
export const selectIsLogin = (state: RootState) => {
    return state.user.token !== null && state.user.displayId !== null
}

export default userSlice.reducer
