import { useGetQuestionSetQuery } from '../questionSetService'
import QuestionSetSkeleton from './QuestionSetSkeleton'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
    selectIsRight,
    selectIsDone,
    initQuestionSet,
} from '../questionSetSlice'

import { useEffect } from 'react'
import { IAudio, PracticeMode } from '../questionSetTypes'
import Body from './Body'
import Explanation from './Explanation'
import Questions from './Questions'

type Props = {
    questionSetId: string
    practiceMode: PracticeMode
}

export default function QuestionSet({ questionSetId, practiceMode }: Props) {
    const {
        data: questionSet,
        isLoading, // 第1次请求
        isFetching, // 正在请求
        isError,
        error,
    } = useGetQuestionSetQuery(questionSetId!, {
        skip: questionSetId === undefined,
    })

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initQuestionSet({ questionSetId, practiceMode }))
    }, [questionSetId, dispatch, practiceMode])

    const isDone = useAppSelector(selectIsDone)
    const isRight = useAppSelector(selectIsRight)

    // 仅在第一次加载时显示 skeleton
    if (isLoading) return <QuestionSetSkeleton />

    if (isError) {
        return <div>error: {JSON.stringify(error)}</div>
    }

    return (
        <div className={isFetching ? 'bg-gray-100' : ''}>
            {questionSet ? (
                <>
                    <Audio audio={questionSet.audio} />
                    <Body body={questionSet.body} />
                    <Questions questions={questionSet.questions} />
                    <Explanation explanation={questionSet.explanation} />
                    {isDone &&
                        (isRight ? (
                            <div className="bg-green-100 p-4 text-lg">正确</div>
                        ) : (
                            <div className="bg-red-100 p-4 text-lg">错误</div>
                        ))}
                </>
            ) : (
                <div>
                    出错了：questionSet 是 undefined。你不应该看到这些文字。
                </div>
            )}
        </div>
    )
}

function Audio({ audio }: { audio?: IAudio }) {
    if (!audio) return null
    return <audio controls src={audio.key} />
}
