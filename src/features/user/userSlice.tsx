import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'
import { userApi } from './userService'

export interface UserSliceState {
    token: string | null
    displayId: string | null
    hasFetcedLocalUser: boolean // 是否已经从 localStorage 获取登录信息
    touristQuizChance: number // 如果没有登录，可以做几道题
    quizChance: number // 做题机会
    isMember: boolean
}

const initialState: UserSliceState = {
    token: null,
    displayId: null,
    hasFetcedLocalUser: false,
    touristQuizChance: 10,
    quizChance: 0,
    isMember: false,
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
        quizChanceChangedBy: (state, { payload }: PayloadAction<number>) => {
            state.quizChance += payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                userApi.endpoints.login.matchFulfilled,
                (state, { payload }) => {
                    state.token = payload.token
                    state.displayId = payload.user.displayId
                },
            )
            .addMatcher(
                userApi.endpoints.getUser.matchFulfilled,
                (state, { payload }) => {
                    state.quizChance = payload.quizChance
                    state.isMember = payload.isMember
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
    quizChanceChangedBy,
} = userSlice.actions

/* selectors */
export const selectIsLogin = (state: RootState) => {
    return state.user.token !== null && state.user.displayId !== null
}

export default userSlice.reducer
