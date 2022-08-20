import React from 'react'
import ResultBall from '../features/practiceChapter/ResultBall'
import { useAppSelector } from '../store/hooks'

export default function ChapterResultPage() {
    const results = useAppSelector((state) => state.practiceChapter.results)

    return (
        <div>
            <h1>做题结果</h1>

            <div className="flex">
                {results.map((result, index) => (
                    <ResultBall
                        questionSetResult={result}
                        index={index}
                        key={index}
                    />
                ))}
            </div>
        </div>
    )
}
