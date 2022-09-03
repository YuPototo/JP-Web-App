import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import config from '../../config/config'
import { RootState } from '../store'

export const splitApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: config.API_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.token
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: ['BookFav'],
    endpoints: () => ({}),
})
