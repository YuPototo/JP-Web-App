import { IQuestion } from '../questionSetTypes'
import Body from './Body'
import Explanation from './Explanation'
import Options from './Options'

export default function Questions({ questions }: { questions: IQuestion[] }) {
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
