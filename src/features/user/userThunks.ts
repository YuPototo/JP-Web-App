import { AppThunk } from '../../store/store'
import storageService from '../../utils/storageService'
import { localUserFetched, userLoggedIn, userLoggedOut } from './userSlice'

/* thunks */
export const getLocalUserInfo = (): AppThunk => (dispatch) => {
    const result = storageService.getUserInfo()

    if (result) {
        dispatch(userLoggedIn(result))
    }

    dispatch(localUserFetched())
}

export const logout = (): AppThunk => (dispatch) => {
    storageService.removeUserInfo()
    dispatch(userLoggedOut())
}
