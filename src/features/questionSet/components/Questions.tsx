import { IQuestion } from '../questionSetTypes'
import Body from './Body'
import Explanation from './Explanation'
import Options from './Options'

export default function Questions({
    questions,
    isDone,
}: {
    questions: IQuestion[]
    isDone: boolean
}) {
    return (
        <div>
            {questions.map((question, index) => (
                <div className="mb-10" key={index}>
                    {questions.length > 1 && (
                        <div className="mx-auto mb-10 h-2 w-32 rounded bg-green-100"></div>
                    )}
                    <Question
                        question={question}
                        questionIndex={index}
                        answer={question.answer}
                        isDone={isDone}
                    />
                </div>
            ))}
        </div>
    )
}

function Question({
    question,
    questionIndex,
    answer,
    isDone,
}: {
    question: IQuestion
    questionIndex: number
    answer: number
    isDone: boolean
}) {
    return (
        <div>
            <div className="mb-6 text-lg">
                <Body body={question.body} />
            </div>

            <Options
                options={question.options}
                questionIndex={questionIndex}
                answer={answer}
            />

            {isDone && <Explanation explanation={question.explanation} />}
        </div>
    )
}
