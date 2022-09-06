import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import { RootState } from '../store'

export const queryErrorMiddleware: Middleware<{}, RootState> =
    () => (next) => (action) => {
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
            return next(action)
        }

        //@ts-ignore
        const hasData = 'data' in payload
        if (hasData) {
            //@ts-ignore
            const errMsg = payload.data.message ?? JSON.stringify(payload.data)
            toast.error(errMsg, { duration: 4000 })
        } else {
            const errMsg =
                //@ts-ignore
                'error' in payload ? payload.error : JSON.stringify(payload)
            toast.error(errMsg, { duration: 4000 })
        }

        return next(action)
    }
