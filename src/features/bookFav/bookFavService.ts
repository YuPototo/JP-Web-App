import { splitApi } from '../../store/query/splitApi'
// import { RootState } from '../../store/store'

export const bookFavApi = splitApi.injectEndpoints({
    endpoints: (build) => ({
        checkBookFav: build.query<boolean, string>({
            query: (bookId: string) => `bookFav/${bookId}`,
            transformResponse: (res: { isFav: boolean }) => res.isFav,
            providesTags: (result, error, bookId) => [
                { type: 'BookFav', id: bookId },
            ],
        }),
        addBookFav: build.mutation<void, string>({
            query: (bookId: string) => ({
                url: `bookFav/${bookId}`,
                method: 'POST',
            }),
            invalidatesTags: (result, error, bookId) => [
                { type: 'BookFav', id: bookId },
            ],
        }),
        removeBookFav: build.mutation<void, string>({
            query: (bookId: string) => ({
                url: `bookFav/${bookId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, bookId) => [
                { type: 'BookFav', id: bookId },
            ],
        }),
    }),
})

export const {
    useAddBookFavMutation,
    useRemoveBookFavMutation,
    useCheckBookFavQuery,
} = bookFavApi
