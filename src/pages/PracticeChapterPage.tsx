import clsx from 'clsx'
import { useNavigate, useParams } from 'react-router-dom'
import QuestionSet from '../features/questionSet/QuestionSet'
import { useGetChapterQuery } from '../features/practiceChapter/chapterSerivce'
import QuestionSetSkeleton from '../features/questionSet/QuestionSetSkeleton'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
    fillOptionsThunk,
    selectIsDone,
} from '../features/questionSet/questionSetSlice'
import { useEffect } from 'react'
import {
    initResults,
    setChapterId,
} from '../features/practiceChapter/practiceChapterSlice'
import { PracticeMode } from '../features/questionSet/questionSetTypes'

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

    const {
        data: chapterInfo,
        isLoading: isLoadingChapterInfo,
        isError: isQueryError,
        isSuccess: isQuerySuccess,
        error,
    } = useGetChapterQuery(chapterId)

    const isDone = useAppSelector(selectIsDone)

    const qSetIndexNumber = parseInt(qSetIndexString)

    const questionSets = chapterInfo?.questionSets || []
    const questionSetId = questionSets[qSetIndexNumber]

    // init results
    useEffect(() => {
        if (isQuerySuccess) {
            dispatch(initResults(questionSets.length))
        }
    }, [dispatch, chapterId, isQuerySuccess, questionSets.length])

    if (isQueryError) {
        return <div>出错了：{JSON.stringify(error)}</div>
    }

    const handleToNext = () => {
        navigate(`/chapter/${chapterId}/index/${qSetIndexNumber + 1}`, {
            replace: true,
        })
    }

    const handleToLast = () => {
        navigate(`/chapter/${chapterId}/index/${qSetIndexNumber - 1}`, {
            replace: true,
        })
    }

    const handleFinishChapter = () => {
        navigate(`/chapterResult/${chapterId}`, { replace: true })
    }

    return (
        <div>
            <ChapterTitle
                isLoading={isLoadingChapterInfo}
                title={chapterInfo?.title}
            />
            <ChapterDesc
                isLoading={isLoadingChapterInfo}
                desc={chapterInfo?.desc}
            />

            {isLoadingChapterInfo && <QuestionSetSkeleton />}

            {isQuerySuccess &&
                (questionSetId ? (
                    <QuestionSet
                        questionSetId={questionSetId}
                        practiceMode={PracticeMode.Chapter}
                    />
                ) : (
                    <div>
                        出错了：chapter 内没有第{qSetIndexString}个 question set
                        id
                    </div>
                ))}

            <button
                className={clsx('m-2 bg-green-100 p-2', {
                    invisible: noLastQuestionSet(qSetIndexNumber),
                })}
                disabled={noLastQuestionSet(qSetIndexNumber)}
                onClick={handleToLast}
            >
                上一题
            </button>

            <button
                className={clsx('m-2 bg-green-100 p-2', {
                    invisible: isDone,
                })}
                onClick={() => dispatch(fillOptionsThunk())}
            >
                答案
            </button>

            {hasNextQuestionSet(qSetIndexNumber, questionSets) && (
                <button
                    className={clsx('m-2 bg-green-100 p-2', {
                        invisible: !isDone,
                    })}
                    onClick={handleToNext}
                >
                    下一题
                </button>
            )}

            {isLastQuestionSet(qSetIndexNumber, questionSets) && (
                <button
                    className={clsx('m-2 bg-green-100 p-2', {
                        invisible: !isDone,
                    })}
                    onClick={handleFinishChapter}
                >
                    完成本章
                </button>
            )}
        </div>
    )
}

function ChapterTitle({
    isLoading,
    title,
}: {
    isLoading: boolean
    title?: string
}) {
    if (isLoading) {
        return <div className="skeleton h-6 w-12"></div>
    }

    return <div>{title}</div>
}

function ChapterDesc({
    isLoading,
    desc,
}: {
    isLoading: boolean
    desc?: string
}) {
    if (isLoading) {
        return <div className="skeleton h-6 w-12"></div>
    }

    if (desc) {
        return <div>{desc}</div>
    }

    return <></>
}

function noLastQuestionSet(qSetIndex: number) {
    return qSetIndex === 0
}

function hasNextQuestionSet(qSetIndex: number, questionSets: string[]) {
    return qSetIndex < questionSets.length - 1
}

function isLastQuestionSet(qSetIndex: number, questionSets: string[]) {
    return qSetIndex === questionSets.length - 1
}
