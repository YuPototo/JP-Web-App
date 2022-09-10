import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import { RootState } from '../store'
import { logout } from '../../features/user/userThunks'

export const authRejectionMiddleware: Middleware<{}, RootState> =
    (storeApi) => (next) => (action) => {
        const isCreatedByAsyncThunk = isRejectedWithValue()(action)

        if (!isCreatedByAsyncThunk) {
            return next(action)
        }

        const { payload } = action

        /*
         * Tech debt
         * Action type is not corretely infered
         */
        //@ts-ignore
        if (payload.status === 401) {
            toast.error('请登录')

            /*  Tech debt: dispatch from storeApi is not typed correctly.
             *  If I use Middleware<{}, RootState, AppDispatch>, circular import would happen
             */
            // @ts-ignore
            storeApi.dispatch(logout())

            // todo: 跳转到登录页面
            // 需要获取 react-router 的 navigate 对象
        }

        return next(action)
    }
