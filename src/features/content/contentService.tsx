import { splitApi } from '../../store/query/splitApi'
import { ISection } from './contentTypes'

export const contentApi = splitApi.injectEndpoints({
    endpoints: (build) => ({
        getBookContent: build.query<ISection[], string>({
            query: (bookId) => `books/${bookId}/contents`,
            transformResponse: (res: { sections: ISection[] }) => res.sections,
        }),
    }),
})

export const { useGetBookContentQuery } = contentApi
