import clsx from 'clsx'
import { useNavigate, useParams } from 'react-router-dom'
import QuestionSet from '../features/practice/QuestionSet'
import { useGetChapterQuery } from '../features/practice/practiceService'
import QuestionSetSkeleton from '../features/practice/QuestionSetSkeleton'

export default function PracticePage() {
    const { chapterId, questionSetIndex: qSetIndexString } = useParams() as {
        chapterId: string
        questionSetIndex: string
    }

    const {
        data: chapterInfo,
        isLoading: isLoadingChapterInfo,
        isError: isQueryError,
        isSuccess: isQuerySuccess,
        error,
    } = useGetChapterQuery(chapterId)

    const navigate = useNavigate()

    const qSetIndexNumber = parseInt(qSetIndexString)

    const questionSets = chapterInfo?.questionSets || []
    const questionSetId = questionSets[qSetIndexNumber]

    if (isQueryError) {
        return <div>出错了：{JSON.stringify(error)}</div>
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
                    <QuestionSet questionSetId={questionSetId} />
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
                onClick={() =>
                    navigate(
                        `/chapter/${chapterId}/index/${qSetIndexNumber - 1}`
                    )
                }
            >
                上一题
            </button>
            {hasNextQuestionSet(qSetIndexNumber, questionSets) && (
                <button
                    className={clsx('m-2 bg-green-100 p-2')}
                    onClick={() =>
                        navigate(
                            `/chapter/${chapterId}/index/${qSetIndexNumber + 1}`
                        )
                    }
                >
                    下一题
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
