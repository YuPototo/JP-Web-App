import { IAudio, IQuestion, useGetQuestionSetQuery } from './questionSetService'
import QuestionSetSkeleton from './QuestionSetSkeleton'
import RichtTextRenderer from 'jp_to_react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
    pickOptionThunk,
    selectPickedIndex,
    selectIsRight,
    selectIsDone,
    setQuestionSetId,
} from './questionSetSlice'
import clsx from 'clsx'
import { useEffect } from 'react'

type Props = {
    questionSetId: string
}

export default function QuestionSet({ questionSetId }: Props) {
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
        dispatch(setQuestionSetId(questionSetId))
    }, [questionSetId, dispatch])

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

function Body({ body }: { body?: string }) {
    if (!body) return null
    return <RichtTextRenderer data={body} />
}

function Explanation({ explanation }: { explanation?: string }) {
    if (!explanation) return null
    return <RichtTextRenderer data={explanation} />
}

function Option({
    option,
    questionIndex,
    optionIndex,
    picked,
}: {
    option: string
    questionIndex: number
    optionIndex: number
    picked: boolean
}) {
    const dispatch = useAppDispatch()

    const isDone = useAppSelector(selectIsDone)

    return (
        <div
            onClick={() =>
                dispatch(pickOptionThunk({ questionIndex, optionIndex }))
            }
            className={clsx(
                '"my-4 hover:bg-yellow-100" p-2 ',
                { 'cursor-pointer': !isDone },
                { 'bg-gray-300': picked }
            )}
        >
            <RichtTextRenderer data={option} />
        </div>
    )
}

function Options({
    options,
    questionIndex,
}: {
    options: string[]
    questionIndex: number
}) {
    const pickedIndex = useAppSelector(selectPickedIndex(questionIndex))
    return (
        <div>
            {options.map((option, index) => (
                <Option
                    key={index}
                    option={option}
                    optionIndex={index}
                    questionIndex={questionIndex}
                    picked={pickedIndex === index}
                />
            ))}
        </div>
    )
}

function Question({
    question,
    questionIndex,
}: {
    question: IQuestion
    questionIndex: number
}) {
    return (
        <div>
            <Body body={question.body} />
            <Options options={question.options} questionIndex={questionIndex} />
            <Explanation explanation={question.explanation} />
        </div>
    )
}

function Questions({ questions }: { questions: IQuestion[] }) {
    return (
        <div>
            {questions.map((question, index) => (
                <Question
                    key={index}
                    question={question}
                    questionIndex={index}
                />
            ))}
        </div>
    )
}
