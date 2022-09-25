import { AppThunk } from '../../store/store'
import userStorage from './userStorage'
import {
    localUserFetched,
    quizChanceConsumed,
    touristQuizChanceChangedBy,
    touristQuizChanceChangedTo,
    userLoggedIn,
    userLoggedOut,
} from './userSlice'
import { userApi } from './userService'

/* thunks */
export const getLocalUserInfo = (): AppThunk => (dispatch) => {
    const result = userStorage.getUserInfo()

    if (result) {
        dispatch(userLoggedIn(result))
    }

    dispatch(localUserFetched())
}

export const logout = (): AppThunk => (dispatch) => {
    userStorage.removeUserInfo()
    dispatch(userLoggedOut())
}

export const getTouristChance = (): AppThunk => (dispatch) => {
    const chance = userStorage.getTouristQuizChance()
    if (chance !== undefined) {
        dispatch(touristQuizChanceChangedTo(chance))
    }
}

export const reduceTouristChance = (): AppThunk => (dispatch, getState) => {
    dispatch(touristQuizChanceChangedBy(-1))

    const state = getState()

    const touristChance = state.user.touristQuizChance

    userStorage.setTouristQuizChance(touristChance)
}

export const reduceQuizChance = (): AppThunk => (dispatch, getState) => {
    dispatch(quizChanceConsumed())
    dispatch(userApi.endpoints.reduceQuizChance.initiate())
}
