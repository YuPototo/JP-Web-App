import clsx from 'clsx'
import RichTextRenderer from 'jp_to_react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { selectPickedIndex, selectIsDone } from '../questionSetSlice'
import { pickOptionThunk } from '../questionSetThunks'

export default function Options({
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
                dispatch(
                    pickOptionThunk({
                        questionIndex,
                        optionIndex,
                    }),
                )
            }
            className={clsx(
                '"my-4 hover:bg-yellow-100" p-2 ',
                { 'cursor-pointer': !isDone },
                { 'bg-gray-300': picked },
            )}
        >
            <RichTextRenderer data={option} />
        </div>
    )
}
