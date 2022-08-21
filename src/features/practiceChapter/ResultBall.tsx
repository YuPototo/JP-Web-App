import clsx from 'clsx'
import React from 'react'
import { QuestionSetResult, Result } from './practiceChapterSlice'

type Props = {
    questionSetResult: QuestionSetResult
    index: number
}

export default function ResultBall({ questionSetResult, index }: Props) {
    const { result } = questionSetResult
    return (
        <div
            className={clsx(
                'm-3 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full',
                {
                    'bg-green-300': result === Result.Right,
                    'bg-red-300': result === Result.Wrong,
                    'bg-gray-300': result === Result.NoRecord,
                }
            )}
        >
            {index + 1}
        </div>
    )
}
