import React from 'react'
import { useNavigate } from 'react-router-dom'
import ResultBall from '../features/practiceChapter/ResultBall'
import { useAppSelector } from '../store/hooks'

export default function ChapterResultPage() {
    const navigate = useNavigate()
    const results = useAppSelector((state) => state.practiceChapter.results)

    return (
        <div>
            <h1>做题结果</h1>

            <div className="flex">
                {results.map((result, index) => (
                    <div
                        key={index}
                        onClick={() =>
                            navigate(`/practiceReview/${result.questionSetId}`)
                        }
                    >
                        <ResultBall questionSetResult={result} index={index} />
                    </div>
                ))}
            </div>
        </div>
    )
}
