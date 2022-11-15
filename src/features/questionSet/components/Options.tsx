import clsx from 'clsx'
import RichTextRenderer from 'jp_to_react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { selectPickedIndex, selectIsDone } from '../questionSetSlice'
import { pickOption } from '../questionSetThunks'
import { RichText } from '../questionSetTypes'

export default function Options({
    options,
    questionIndex,
    answer,
}: {
    options: RichText[]
    questionIndex: number
    answer: number
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
                    isAnswer={answer === index}
                />
            ))}
        </div>
    )
}

function Option({
    option,
    questionIndex,
    optionIndex,
    picked,
    isAnswer,
}: {
    option: RichText
    questionIndex: number
    optionIndex: number
    picked: boolean
    isAnswer: boolean
}) {
    const dispatch = useAppDispatch()

    const isDone = useAppSelector(selectIsDone)

    return (
        <div
            onClick={() =>
                dispatch(
                    pickOption({
                        questionIndex,
                        optionIndex,
                    }),
                )
            }
            className={clsx('my-4 mx-4 min-w-max rounded border-2 py-2 pl-4', {
                'cursor-pointer': !isDone,
                'bg-gray-200': !isDone && picked,
                'hover:bg-gray-200': !isDone,
                'bg-green-200': isDone && isAnswer,
                'bg-red-300': isDone && picked,
            })}
        >
            <RichTextRenderer data={option} />
        </div>
    )
}
