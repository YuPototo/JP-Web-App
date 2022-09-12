import { splitApi } from '../../store/query/splitApi'
import { INotebook } from './notebookTypes'

export const notebookApi = splitApi.injectEndpoints({
    endpoints: (build) => ({
        getNotebooks: build.query<INotebook[], void>({
            query: () => 'notebooks',
            transformResponse: (res: { notebooks: INotebook[] }) =>
                res.notebooks,
            keepUnusedDataFor: 6000,
            providesTags: ['Notebook'],
        }),
        createNotebook: build.mutation<INotebook, string>({
            query: (title) => ({
                url: 'notebooks',
                body: {
                    title,
                },
                method: 'POST',
            }),
            transformResponse: (res: { notebook: INotebook }) => res.notebook,
            invalidatesTags: ['Notebook'],
        }),
        updateNotebook: build.mutation<
            INotebook,
            { notebookId: string; title: string }
        >({
            query: ({ notebookId, title }) => ({
                url: `/notebooks/${notebookId}`,
                method: 'PATCH',
                body: { title },
            }),
            invalidatesTags: ['Notebook'],
        }),
        deleteNotebook: build.mutation<void, string>({
            query: (notebookId) => ({
                url: `/notebooks/${notebookId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Notebook'],
        }),
    }),
})

export const {
    useGetNotebooksQuery,
    useCreateNotebookMutation,
    useDeleteNotebookMutation,
    useUpdateNotebookMutation,
} = notebookApi
