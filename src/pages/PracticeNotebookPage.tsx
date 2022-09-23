import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import QuestionSetListOperator from '../components/QuestionSetListOperator'
import { useGetNotebookContentQuery } from '../features/notebook/notebookService'
import {
    notebookUsed,
    questionSetIdsAdded,
} from '../features/notebook/notebookSlice'
import QuestionSet from '../features/questionSet/components/QuestionSet'
import { useGetQuestionSetQuery } from '../features/questionSet/questionSetService'
import { PracticeMode } from '../features/questionSet/questionSetTypes'
import { routes } from '../routes/routeBuilder'
import { useAppDispatch } from '../store/hooks'

export default function PracticeNotebookPage() {
    const { notebookId, questionSetIndex: qSetIndexString } = useParams() as {
        notebookId: string
        questionSetIndex: string
    }
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const questionSetIndex = parseInt(qSetIndexString)

    useEffect(() => {
        dispatch(notebookUsed(notebookId))
    }, [notebookId, dispatch])

    const { data: questionSetIds } = useGetNotebookContentQuery(notebookId)

    useEffect(() => {
        questionSetIds && dispatch(questionSetIdsAdded(questionSetIds))
    }, [dispatch, questionSetIds])

    const questionSets = questionSetIds || []
    const questionSetId = questionSets[questionSetIndex]

    const {
        isFetching: isFetchingQuestionSet,
        isLoading: isLoadingQuestionSet,
    } = useGetQuestionSetQuery(questionSetId!, {
        skip: questionSetId === undefined,
    })

    const foundQuestionSetId = questionSetId !== undefined

    if (!foundQuestionSetId) {
        return (
            <div>
                出错了：chapter.questionSetIds 里找不到第{questionSetIndex}个
                element
            </div>
        )
    }

    const showBtnArea = !isLoadingQuestionSet
    const showQuestionSet = foundQuestionSetId
    const disableBtnArea = isFetchingQuestionSet

    const handleToNext = () => {
        navigate(routes.practiceNotebook(notebookId, questionSetIndex + 1), {
            replace: true,
        })
    }

    const handleToLast = () => {
        navigate(routes.practiceNotebook(notebookId, questionSetIndex - 1), {
            replace: true,
        })
    }

    const handleFinish = () => {
        navigate(routes.notebook(notebookId), { replace: true })
    }

    return (
        <div>
            {showQuestionSet && (
                <QuestionSet
                    questionSetId={questionSetId}
                    practiceMode={PracticeMode.Notebook}
                />
            )}

            {showBtnArea && (
                <QuestionSetListOperator
                    index={questionSetIndex}
                    questionSetCount={questionSets.length}
                    disabled={disableBtnArea}
                    onToLast={handleToLast}
                    onToNext={handleToNext}
                    onFinish={handleFinish}
                />
            )}
        </div>
    )
}
