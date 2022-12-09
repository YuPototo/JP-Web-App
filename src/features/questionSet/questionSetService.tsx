import { splitApi } from '../../store/query/splitApi'
import { IQuestionSet } from './questionSetTypes'

interface GetQuestionSetRes {
    questionSet: IQuestionSet
    isFav?: boolean
}

export const questionSetApi = splitApi.injectEndpoints({
    endpoints: (build) => ({
        getQuestionSet: build.query<GetQuestionSetRes, string>({
            query: (questionSetId) => `questionSets/${questionSetId}`,
        }),
    }),
})

export const { useGetQuestionSetQuery, usePrefetch } = questionSetApi

export const updateQuestionSetFav = (questionSetId: string, isFav: boolean) =>
    questionSetApi.util.updateQueryData(
        'getQuestionSet',
        questionSetId,
        (state) => {
            state.isFav = isFav
        },
    )
