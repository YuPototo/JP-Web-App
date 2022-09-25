import { splitApi } from '../../store/query/splitApi'
import { AppThunk } from '../../store/store'

export const wrongRecordApi = splitApi.injectEndpoints({
    endpoints: (build) => ({
        getWrongRecord: build.query<string[], void>({
            query: () => `wrongRecords`,
            transformResponse: (response: { questionSetIds: string[] }) =>
                response.questionSetIds,
            providesTags: ['WrongRecord'],
        }),
        addWrongRecord: build.mutation<void, string>({
            query: (questionSetId) => ({
                url: `wrongRecords/${questionSetId}`,
                method: 'POST',
            }),
            invalidatesTags: ['WrongRecord'],
        }),
        deleteWrongRecord: build.mutation<void, string>({
            query: (questionSetId) => ({
                url: `wrongRecords/${questionSetId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['WrongRecord'],
        }),
    }),
})

export const {
    useGetWrongRecordQuery,
    useAddWrongRecordMutation,
    useDeleteWrongRecordMutation,
} = wrongRecordApi

/* thunks */
export const sendWrongRecord =
    (questionSetId: string): AppThunk =>
    (dispatch) => {
        dispatch(
            wrongRecordApi.endpoints.addWrongRecord.initiate(questionSetId),
        )
    }

export const removeWrongRecord =
    (questionSetId: string): AppThunk =>
    (dispatch) => {
        dispatch(
            wrongRecordApi.endpoints.deleteWrongRecord.initiate(questionSetId),
        )
    }
