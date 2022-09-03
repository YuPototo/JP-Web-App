import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppThunk, RootState } from '../../store/store'
import storageService from '../../utils/storageService'
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
        setToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload
        },
        setDisplayId: (state, action: PayloadAction<string | null>) => {
            state.displayId = action.payload
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

export const { setToken, setDisplayId } = userSlice.actions

/* selectors */
export const selectIsLogin = (state: RootState) => {
    return state.user.token !== null && state.user.displayId !== null
}

export default userSlice.reducer

/* thunks */
export const getLocalUserInfo = (): AppThunk => (dispatch) => {
    const result = storageService.getUserInfo()

    if (result) {
        dispatch(setToken(result.token))
        dispatch(setDisplayId(result.displayId))
    }
}

export const logoutThunk = (): AppThunk => (dispatch) => {
    storageService.removeUserInfo()
    dispatch(setToken(null))
    dispatch(setDisplayId(null))
}
