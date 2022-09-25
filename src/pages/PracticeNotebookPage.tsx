import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import QuestionSetListOperator from '../components/QuestionSetListOperator'
import { useGetNotebookContentQuery } from '../features/notebook/notebookService'
import {
    noteBookPracticeStarted,
    questionSetIdsAdded,
} from '../features/notebook/notebookSlice'
import QuestionSet from '../features/questionSet/components/QuestionSet'
import { useGetQuestionSetLoadingInfo } from '../features/questionSet/hooks/useGetQuestionSetLoadingInfo'
import { PracticeMode } from '../features/questionSet/questionSetTypes'
import PayWall from '../features/user/components/PayWall'
import { useChanceGuard } from '../features/user/hooks/useChanceGuard'
import { routes } from '../routes/routeBuilder'
import { useAppDispatch, useAppSelector } from '../store/hooks'

export default function PracticeNotebookPage() {
    const navigate = useNavigate()

    const showNoMoreChanceModal = useChanceGuard()

    // init practice notebook page
    const { notebookId, questionSetId, questionSetIds, questionSetIndex } =
        useInitNotebookPractice()

    // get question set loading info
    const { isLoadingQuestionSet, isFetchingQuestionSet } =
        useGetQuestionSetLoadingInfo(questionSetId)

    // state 1：错误，找不到 questionSet
    if (questionSetId === undefined) {
        return (
            <div>
                出错了 notebookSlice.questionSetIds 里找不到第{questionSetIndex}
                个 element
            </div>
        )
    }

    const handleToNext = () => {
        const nextQuestionSetIndex = questionSetIndex + 1
        const nextQuestionSetId = questionSetIds[nextQuestionSetIndex]
        if (nextQuestionSetId !== undefined) {
            navigate(routes.practiceNotebook(notebookId, nextQuestionSetId), {
                replace: true,
            })
        } else {
            console.error('没有下一个 questionSet 了')
        }
    }

    const handleToLast = () => {
        const lastQuestionSetIndex = questionSetIndex - 1
        const lastQuestionSetId = questionSetIds[lastQuestionSetIndex]
        if (lastQuestionSetId) {
            navigate(routes.practiceNotebook(notebookId, lastQuestionSetId), {
                replace: true,
            })
        } else {
            console.error('没有上一个 questionSet 了')
        }
    }

    const handleFinish = () => {
        navigate(-1)
    }

    return (
        <div>
            <PayWall
                isOpen={showNoMoreChanceModal}
                onModalClosed={() => console.log('不支持关闭')}
            />

            {questionSetId !== undefined && (
                <QuestionSet
                    questionSetId={questionSetId}
                    practiceMode={PracticeMode.Notebook}
                />
            )}

            {!isLoadingQuestionSet && (
                <QuestionSetListOperator
                    index={questionSetIndex}
                    questionSetCount={questionSetIds.length}
                    disabled={isFetchingQuestionSet}
                    onToLast={handleToLast}
                    onToNext={handleToNext}
                    onFinish={handleFinish}
                />
            )}
        </div>
    )
}

function useInitNotebookPractice() {
    const dispatch = useAppDispatch()

    const { notebookId, questionSetId } = useParams() as {
        notebookId: string
        questionSetId: string
    }

    useEffect(() => {
        dispatch(noteBookPracticeStarted(notebookId))
    }, [notebookId, dispatch])

    const { data } = useGetNotebookContentQuery(notebookId)
    useEffect(() => {
        data && dispatch(questionSetIdsAdded(data))
    }, [dispatch, notebookId, data])

    // 从 store 里获取 questionSetIds，因为在做题过程中，可能会添加新的 questionSet 到 notebook 里，这时候 query 里的 questionSets 是最新的。但我不需要最新的 questionSets。
    const questionSetIds = useAppSelector(
        (state) => state.notebook.questionSetIds,
    )

    const questionSetIndex = questionSetIds.indexOf(questionSetId)

    return {
        notebookId,
        questionSetId,
        questionSetIds,
        questionSetIndex,
    }
}
