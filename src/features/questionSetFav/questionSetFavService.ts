import { splitApi } from '../../store/query/splitApi'

export const questionSetFavApi = splitApi.injectEndpoints({
    endpoints: (build) => ({
        saveQuestionSet: build.mutation<
            void,
            { notebookId: string; questionSetId: string }
        >({
            query: (arg) => ({
                url: 'questionSetFav',
                method: 'POST',
                body: arg,
            }),
        }),
        deleteQuestionSet: build.mutation<void, string>({
            query: (questionDetId) => ({
                url: `questionSetFav/${questionDetId}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const { useSaveQuestionSetMutation, useDeleteQuestionSetMutation } =
    questionSetFavApi
