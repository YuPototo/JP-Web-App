import { useGetQuestionSetQuery } from '../questionSetService'
import QuestionSetSkeleton from './QuestionSetSkeleton'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
    selectIsRight,
    selectIsDone,
    newQuestionSetInitiated,
    errorOccured,
} from '../questionSetSlice'

import { useEffect } from 'react'
import { PracticeMode } from '../questionSetTypes'
import Body from './Body'
import Explanation from './Explanation'
import Questions from './Questions'
import Transcription from './Transcription'
import AudioPlayer from './AudioPlayer'
import FavButton from '../../questionSetFav/FavButton'

type Props = {
    questionSetId: string
    practiceMode: PracticeMode
}

export default function QuestionSet({ questionSetId, practiceMode }: Props) {
    const {
        data,
        isLoading, // 第1次请求
        isFetching, // 正在请求
        isError,
        error,
    } = useGetQuestionSetQuery(questionSetId!, {
        skip: questionSetId === undefined,
    })

    const { questionSet, isFav } = data || {}

    const dispatch = useAppDispatch()

    // init question set
    useEffect(() => {
        dispatch(newQuestionSetInitiated({ questionSetId, practiceMode }))
    }, [questionSetId, dispatch, practiceMode])

    // set error
    useEffect(() => {
        isError && dispatch(errorOccured(isError))
    }, [isError, dispatch])

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
                    <AudioPlayer audio={questionSet.audio} />
                    <Body body={questionSet.body} />
                    <Questions questions={questionSet.questions} />
                    <Explanation explanation={questionSet.explanation} />

                    {isDone && (
                        <Transcription
                            transcription={questionSet.audio?.transcription}
                        />
                    )}

                    <FavButton questionSetId={questionSetId} isFav={isFav} />

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
