import { useGetQuestionSetQuery } from '../questionSetService'

/**
 * get question set loading info
 * @returns
 * - isLoadingQuestionSet: 首次运行 query 时，为 true。 questionSetId 变化后，执行 query 时为 false。
 * - isFetchingQuestionSet: 执行 query 时，都为 true
 */
export function useGetQuestionSetLoadingInfo(questionSetId?: string) {
    const {
        isFetching: isFetchingQuestionSet,
        isLoading: isLoadingQuestionSet,
    } = useGetQuestionSetQuery(questionSetId!, {
        skip: questionSetId === undefined,
    })

    return {
        isFetchingQuestionSet,
        isLoadingQuestionSet,
    }
}
