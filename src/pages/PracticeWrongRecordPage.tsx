import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import QuestionSetListOperator from '../components/QuestionSetListOperator'
import QuestionSet from '../features/questionSet/components/QuestionSet'
import { useGetQuestionSetLoadingInfo } from '../features/questionSet/hooks/useGetQuestionSetLoadingInfo'
import { PracticeMode } from '../features/questionSet/questionSetTypes'
import useAuthGuard from '../features/user/hooks/useAuthGuard'
import { useGetWrongRecordQuery } from '../features/wrongRecord/wrongRecordService'
import {
    wrongbookPracticeStarted,
    wrongRecordLoaded,
    wrongRecordPracticeChangedBy,
} from '../features/wrongRecord/wrongRecordSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'

export default function PracticeWrongRecordPage() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { questionSetId, questionSetIds, questionSetIndex } =
        useInitWrongBookPractice()

    // get question set loading info
    const { isLoadingQuestionSet, isFetchingQuestionSet } =
        useGetQuestionSetLoadingInfo(questionSetId)

    // state 1：错误，找不到 questionSet
    if (questionSetId === undefined) {
        return (
            <div>
                出错了 wrongRecordSlice.questionSetIds 里找不到第
                {questionSetIndex}个 element
            </div>
        )
    }

    return (
        <div>
            {questionSetId !== undefined && (
                <QuestionSet
                    questionSetId={questionSetId}
                    practiceMode={PracticeMode.WrongRecord}
                />
            )}

            {!isLoadingQuestionSet && (
                <QuestionSetListOperator
                    index={questionSetIndex}
                    questionSetCount={questionSetIds.length}
                    disabled={isFetchingQuestionSet}
                    onToLast={() => dispatch(wrongRecordPracticeChangedBy(-1))}
                    onToNext={() => dispatch(wrongRecordPracticeChangedBy(1))}
                    onFinish={() => navigate(-1)}
                />
            )}
        </div>
    )
}

function useInitWrongBookPractice() {
    const dispatch = useAppDispatch()

    const login = useAuthGuard()

    const { data } = useGetWrongRecordQuery(undefined, { skip: !login })

    useEffect(() => {
        dispatch(wrongbookPracticeStarted())
    }, [dispatch])

    useEffect(() => {
        data && dispatch(wrongRecordLoaded(data))
    }, [data, dispatch])

    const questionSetIds = useAppSelector(
        (state) => state.wrongRecord.questionSetIds,
    )

    const questionSetIndex = useAppSelector(
        (state) => state.wrongRecord.currentQuestionSetIndex,
    )

    const questionSetId = questionSetIds[questionSetIndex]

    return {
        questionSetId,
        questionSetIds,
        questionSetIndex,
    }
}
