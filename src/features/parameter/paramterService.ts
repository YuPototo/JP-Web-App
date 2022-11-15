import { splitApi } from '../../store/query/splitApi'

export const paramApi = splitApi.injectEndpoints({
    endpoints: (build) => ({
        getParam: build.query<unknown, string>({
            query: (key) => `parameters/${key}`,
            transformResponse: (res: { value: unknown }) => res.value,
        }),
    }),
})

export const { useGetParamQuery } = paramApi
