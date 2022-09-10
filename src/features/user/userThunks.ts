import { AppThunk } from '../../store/store'
import storageService from '../../utils/storageService'
import { userLoggedIn, userLoggedOut } from './userSlice'

/* thunks */
export const getLocalUserInfo = (): AppThunk => (dispatch) => {
    const result = storageService.getUserInfo()

    if (result) {
        dispatch(userLoggedIn(result))
    }
}

export const logout = (): AppThunk => (dispatch) => {
    storageService.removeUserInfo()
    dispatch(userLoggedOut())
}
