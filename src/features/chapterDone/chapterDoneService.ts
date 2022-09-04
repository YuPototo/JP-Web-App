import { splitApi } from '../../store/query/splitApi'
// import { RootState } from '../../store/store'

type AddChapterDoneArg = {
    bookId: string
    chapterId: string
}
export const chapterDoneApi = splitApi.injectEndpoints({
    endpoints: (build) => ({
        getChapterDone: build.query<string[], string>({
            query: (bookId) => `chapterDone/${bookId}`,
            transformResponse: (res: { chapters: string[] }) => res.chapters,
            providesTags: (result, error, bookId) => [
                { type: 'ChapterDone', id: bookId },
            ],
        }),
        addChapterDone: build.mutation<void, AddChapterDoneArg>({
            query: ({ bookId, chapterId }) => ({
                url: `chapterDone/${bookId}`,
                method: 'POST',
                body: { chapterId },
            }),
            invalidatesTags: (result, error, { bookId }) => [
                { type: 'ChapterDone', id: bookId },
            ],
        }),
        deleteChapterDone: build.mutation<void, string>({
            query: (bookId) => ({
                url: `chapterDone/${bookId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, bookId) => [
                { type: 'ChapterDone', id: bookId },
            ],
        }),
    }),
})

export const {
    useAddChapterDoneMutation,
    useGetChapterDoneQuery,
    useDeleteChapterDoneMutation,
} = chapterDoneApi

export const selectChapterDonesByBook = (bookId: string) => {
    return chapterDoneApi.endpoints.getChapterDone.select(bookId)
}
