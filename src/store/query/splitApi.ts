import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import config from '../../config/config'

export const splitApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: config.API_URL,
    }),
    endpoints: () => ({}),
})
