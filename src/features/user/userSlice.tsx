import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'
import { userApi } from './userService'

export interface UserSliceState {
    token: string | null
    displayId: string | null
    hasFetcedLocalUser: boolean
}

const initialState: UserSliceState = {
    token: null,
    displayId: null,
    hasFetcedLocalUser: false,
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
        localUserFetched: (state) => {
            state.hasFetcedLocalUser = true
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

export const { userLoggedIn, userLoggedOut, localUserFetched } =
    userSlice.actions

/* selectors */
export const selectIsLogin = (state: RootState) => {
    return state.user.token !== null && state.user.displayId !== null
}

export default userSlice.reducer
