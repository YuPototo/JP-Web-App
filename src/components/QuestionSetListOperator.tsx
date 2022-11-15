import clsx from 'clsx'
import { CaretLeft, CaretRightFill, LightbulbFill } from 'react-bootstrap-icons'
import { selectIsDone } from '../features/questionSet/questionSetSlice'
import { showAnswer } from '../features/questionSet/questionSetThunks'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import Button from './ui/Button'

/**
 * 操作一列 questionSet 的组件
 */

type Props = {
    index: number // 当前的题目 index
    questionSetCount: number // 总的题目数量
    disabled: boolean // 是否不允许操作
    onToLast: () => void // 去上一题
    onToNext: () => void // 去下一题
    onFinish: () => void // 结束
}

export default function QuestionSetListOperator({
    index,
    questionSetCount,
    disabled,
    onToLast,
    onToNext,
    onFinish,
}: Props) {
    const dispatch = useAppDispatch()
    const isDone = useAppSelector(selectIsDone)

    const isQuestionSetError = useAppSelector(
        (state) => state.questionSet.isError,
    )

    const hasNext = index < questionSetCount - 1
    const hasPreviousQuestionSet = index > 0

    const handleContinue = () => {
        hasNext ? onToNext() : onFinish()
    }

    return (
        <div className="flex gap-3">
            <div className={clsx({ invisible: !hasPreviousQuestionSet })}>
                <Button
                    color="gray"
                    outline
                    className={clsx('flex items-center justify-center gap-1')}
                    disabled={disabled}
                    onClick={onToLast}
                >
                    <CaretLeft />
                    上一题
                </Button>
            </div>

            <div className={clsx({ invisible: isDone })}>
                <Button
                    color="gray"
                    outline
                    className={clsx('flex items-center justify-center gap-2')}
                    disabled={disabled}
                    onClick={() => dispatch(showAnswer())}
                >
                    <LightbulbFill />
                    答案
                </Button>
            </div>

            <div
                className={clsx({
                    invisible: !showNextBtn(isDone, isQuestionSetError),
                })}
            >
                <Button
                    outline
                    className={clsx('flex items-center justify-center gap-2')}
                    disabled={disabled}
                    onClick={handleContinue}
                >
                    {hasNext ? '下一题' : '完成'}
                    <CaretRightFill />
                </Button>
            </div>
        </div>
    )
}

function showNextBtn(isDone: boolean, isQuestionSetError: boolean) {
    if (isQuestionSetError) return true
    return isDone
}
