import clsx from 'clsx'
import { useNavigate, useParams } from 'react-router-dom'
import QuestionSet from '../features/questionSet/components/QuestionSet'
import { useGetChapterQuery } from '../features/practiceChapter/chapterSerivce'
import QuestionSetSkeleton from '../features/questionSet/components/QuestionSetSkeleton'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
    fillOptionsThunk,
    selectIsDone,
} from '../features/questionSet/questionSetSlice'
import { useEffect } from 'react'
import {
    initResults,
    setChapterId,
    setQuestionSetIndex,
} from '../features/practiceChapter/practiceChapterSlice'
import { PracticeMode } from '../features/questionSet/questionSetTypes'
import { useGetQuestionSetQuery } from '../features/questionSet/questionSetService'
import { routeBuilder } from '../routes/routeBuilder'

export default function PracticeChapterPage() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { chapterId, questionSetIndex: qSetIndexString } = useParams() as {
        chapterId: string
        questionSetIndex: string
    }

    useEffect(() => {
        dispatch(setChapterId(chapterId))
    }, [chapterId, dispatch])

    useEffect(() => {
        dispatch(setQuestionSetIndex(parseInt(qSetIndexString)))
    }, [qSetIndexString, dispatch])

    const {
        data: chapterInfo,
        isLoading: isLoadingChapterInfo,
        isError: isQueryError,
        isSuccess: isQuerySuccess,
        error,
    } = useGetChapterQuery(chapterId)

    const questionSetIndex = useAppSelector(
        (state) => state.practiceChapter.questionSetIndex,
    )

    const questionSets = chapterInfo?.questionSets || []
    const questionSetId = questionSets[questionSetIndex]

    // init results
    useEffect(() => {
        if (isQuerySuccess) {
            dispatch(initResults(questionSets.length))
        }
    }, [dispatch, chapterId, isQuerySuccess, questionSets.length])

    const {
        isFetching: isFetchingQuestionSet,
        isLoading: isLoadingQuestionSet,
    } = useGetQuestionSetQuery(questionSetId!, {
        skip: questionSetId === undefined,
    })

    if (isLoadingChapterInfo) {
        return (
            <>
                <QuestionInfoSkeleton />

                <QuestionSetSkeleton />
            </>
        )
    }

    if (isQueryError) {
        return <div>获取 chapter 信息出错：{JSON.stringify(error)}</div>
    }

    const foundQuestionSetId = questionSetId !== undefined

    if (!foundQuestionSetId) {
        return (
            <div>
                出错了：chapter.questionSetIds 里找不到第{questionSetIndex}个
                element
            </div>
        )
    }

    const showBtnArea = isQuerySuccess && !isLoadingQuestionSet
    const showChapterInfo = chapterInfo && questionSetIndex === 0
    const showQuestionSet = isQuerySuccess && foundQuestionSetId
    const disableBtnArea = isFetchingQuestionSet

    const handleToNext = () => {
        navigate(
            routeBuilder.practiceChapter(chapterId, questionSetIndex + 1),
            {
                replace: true,
            },
        )
    }

    const handleToLast = () => {
        navigate(
            routeBuilder.practiceChapter(chapterId, questionSetIndex - 1),
            {
                replace: true,
            },
        )
    }

    const handleFinishChapter = () => {
        navigate(routeBuilder.chapterResult(chapterId), { replace: true })
    }

    return (
        <div>
            {showChapterInfo && (
                <ChapterInfo
                    title={chapterInfo.title}
                    desc={chapterInfo.desc}
                />
            )}

            {showQuestionSet && (
                <QuestionSet
                    questionSetId={questionSetId}
                    practiceMode={PracticeMode.Chapter}
                />
            )}

            {showBtnArea && (
                <OperationArea
                    questionSetIndex={questionSetIndex}
                    questionSets={questionSets}
                    disabled={disableBtnArea}
                    handleToLast={handleToLast}
                    handleToNext={handleToNext}
                    handleFinishChapter={handleFinishChapter}
                />
            )}
        </div>
    )
}

function QuestionInfoSkeleton() {
    return (
        <div>
            <div className="skeleton my-2 h-6 w-12"></div>
            <div className="skeleton my-2 h-6 w-12"></div>
        </div>
    )
}

function ChapterInfo({ title, desc }: { title: string; desc?: string }) {
    return (
        <div>
            <div>{title}</div>
            {desc && <div>{desc}</div>}
        </div>
    )
}

function OperationArea({
    questionSetIndex,
    questionSets,
    disabled,
    handleToLast,
    handleToNext,
    handleFinishChapter,
}: {
    questionSetIndex: number
    questionSets: string[]
    disabled: boolean
    handleToLast: () => void
    handleToNext: () => void
    handleFinishChapter: () => void
}) {
    const dispatch = useAppDispatch()
    const isDone = useAppSelector(selectIsDone)

    const isQuestionSetError = useAppSelector(
        (state) => state.questionSet.isError,
    )

    const hasNext = questionSetIndex < questionSets.length - 1
    const hasPreviousQuestionSet = questionSetIndex > 0

    const handleContinue = () => {
        hasNext ? handleToNext() : handleFinishChapter()
    }

    return (
        <>
            <button
                className={clsx('m-2 bg-green-100 p-2', {
                    invisible: !hasPreviousQuestionSet,
                })}
                disabled={disabled}
                onClick={handleToLast}
            >
                上一题
            </button>

            <button
                className={clsx('m-2 bg-green-100 p-2', {
                    invisible: isDone,
                })}
                disabled={disabled}
                onClick={() => dispatch(fillOptionsThunk())}
            >
                答案
            </button>

            <button
                className={clsx('m-2 bg-green-100 p-2', {
                    invisible: !showNextBtn(isDone, isQuestionSetError),
                })}
                disabled={disabled}
                onClick={handleContinue}
            >
                {hasNext ? '下一题' : '完成本节'}
            </button>
        </>
    )
}

function showNextBtn(isDone: boolean, isQuestionSetError: boolean) {
    if (isQuestionSetError) return true
    return isDone
}
