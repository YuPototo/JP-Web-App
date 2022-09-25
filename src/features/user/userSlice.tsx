import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'
import { userApi } from './userService'

export interface UserSliceState {
    token: string | null
    displayId: string | null
    hasFetcedLocalUser: boolean // 是否已经从 localStorage 获取登录信息
    touristQuizChance: number // 如果没有登录，可以做几道题
}

const initialState: UserSliceState = {
    token: null,
    displayId: null,
    hasFetcedLocalUser: false,
    touristQuizChance: 10,
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
        touristQuizChanceChangedBy: (
            state,
            { payload }: PayloadAction<number>,
        ) => {
            state.touristQuizChance += payload
        },
        touristQuizChanceChangedTo: (
            state,
            { payload }: PayloadAction<number>,
        ) => {
            state.touristQuizChance = payload
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

export const {
    userLoggedIn,
    userLoggedOut,
    localUserFetched,
    touristQuizChanceChangedBy,
    touristQuizChanceChangedTo,
} = userSlice.actions

/* selectors */
export const selectIsLogin = (state: RootState) => {
    return state.user.token !== null && state.user.displayId !== null
}

export default userSlice.reducer
