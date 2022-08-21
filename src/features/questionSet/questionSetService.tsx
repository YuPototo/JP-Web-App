import { splitApi } from '../../store/query/splitApi'
import { IQuestionSet } from './questionSetTypes'

export const questionSetApi = splitApi.injectEndpoints({
    endpoints: (build) => ({
        getQuestionSet: build.query<IQuestionSet, string>({
            query: (questionSetId) => `questionSets/${questionSetId}`,
            transformResponse: (res: { questionSet: IQuestionSet }) =>
                res.questionSet,
        }),
    }),
})

export const { useGetQuestionSetQuery } = questionSetApi
