import { splitApi } from '../../store/query/splitApi'

export interface IGood {
    name: string
    price: number
}

export const notebookApi = splitApi.injectEndpoints({
    endpoints: (build) => ({
        getGoods: build.query<IGood[], void>({
            query: () => 'goods',
            transformResponse: (res: { goods: IGood[] }) => res.goods,
        }),
    }),
})

export const { useGetGoodsQuery } = notebookApi
