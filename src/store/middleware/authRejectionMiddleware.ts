import {
    MiddlewareAPI,
    isRejectedWithValue,
    Middleware,
} from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import { logoutThunk } from '../../features/user/userSlice'

export const authRejectionMiddleware: Middleware =
    (api: MiddlewareAPI) => (next) => (action) => {
        if (isRejectedWithValue(action) && action.payload.status === 401) {
            // 技术债。dispatch 应该是个支持使用 thunk 的 dispatch，但 ts 在这里获取到的是个不能使用 thunk 的 dispatch
            const { dispatch } = api as any

            toast.error('请登录')

            dispatch(logoutThunk())

            // todo: 跳转到登录页面
            // 需要获取 react-router 的 navigate 对象
        }
        return next(action)
    }
