import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import QuestionSet from '../features/questionSet/QuestionSet'
import {
    fillOptionsThunk,
    PracticeMode,
} from '../features/questionSet/questionSetSlice'
import { useAppDispatch } from '../store/hooks'

export default function PracticeReviewPage() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    /** tech debt
     *  * 不使用 as
     */
    const { questionSetId } = useParams() as {
        questionSetId: string
    }

    return (
        <div>
            <QuestionSet
                questionSetId={questionSetId}
                practiceMode={PracticeMode.Chapter}
            />

            <div>
                <button
                    className="m-2 bg-green-100 p-2"
                    onClick={() => dispatch(fillOptionsThunk())}
                >
                    显示答案
                </button>
                <button
                    className="m-2 bg-green-100 p-2"
                    onClick={() => navigate(-1)}
                >
                    返回
                </button>
            </div>
        </div>
    )
}
