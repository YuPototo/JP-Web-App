import { IAudio, IQuestion, useGetQuestionSetQuery } from './practiceService'
import QuestionSetSkeleton from './QuestionSetSkeleton'
import RichtTextRenderer from 'jp_to_react'

type Props = {
    questionSetId: string
}

export default function QuestionSet({ questionSetId }: Props) {
    const {
        data: questionSet, // 请求过程中，questionSet 是上一个请求的数据
        isLoading, // 第1次请求
        isFetching, // 正在请求
        isError,
        error,
    } = useGetQuestionSetQuery(questionSetId!, {
        skip: questionSetId === undefined,
    })

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

function Option({ option }: { option: string }) {
    return <RichtTextRenderer data={option} />
}

function Options({ options }: { options: string[] }) {
    return (
        <div>
            {options.map((option, index) => (
                <Option key={index} option={option} />
            ))}
        </div>
    )
}

function Question({ question }: { question: IQuestion }) {
    return (
        <div>
            <Body body={question.body} />
            <Options options={question.options} />
            <Explanation explanation={question.explanation} />
        </div>
    )
}

function Questions({ questions }: { questions: IQuestion[] }) {
    return (
        <div>
            {questions.map((question, index) => (
                <Question key={index} question={question} />
            ))}
        </div>
    )
}
