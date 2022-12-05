import clsx from 'clsx'
import { LightbulbFill } from 'react-bootstrap-icons'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../components/ui/Button'
import QuestionSet from '../features/questionSet/components/QuestionSet'
import { showAnswer } from '../features/questionSet/questionSetThunks'
import { PracticeMode } from '../features/questionSet/questionSetTypes'
import { useAppDispatch } from '../store/hooks'

export default function PracticeReviewPage() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { questionSetId } = useParams() as {
        questionSetId: string
    }

    return (
        <div className="min-h-screen rounded bg-gray-50">
            <div className="p-10">
                <QuestionSet
                    questionSetId={questionSetId}
                    practiceMode={PracticeMode.Chapter}
                />

                <div className="mt-12 flex gap-4">
                    <div>
                        <Button
                            color="gray"
                            outline
                            className={clsx(
                                'flex items-center justify-center gap-2',
                            )}
                            onClick={() => dispatch(showAnswer())}
                        >
                            <LightbulbFill />
                            答案
                        </Button>
                    </div>

                    <Button outline onClick={() => navigate(-1)}>
                        返回
                    </Button>
                </div>
            </div>
        </div>
    )
}
