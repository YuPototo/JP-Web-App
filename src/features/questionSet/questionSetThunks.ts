/* thunks */

import { AppThunk } from '../../store/store'
import { finishNotebookQuestionSet } from '../notebook/notebookSlice'
import { finishQuestionSet } from '../practiceChapter/practiceChapterThunks'
import {
    answerShown,
    selectCurrentQuestionSet,
    selectIsDone,
    selectQuetionsLength,
    optionSelected,
} from './questionSetSlice'
import { PracticeMode } from './questionSetTypes'

/**
 * 直接展示答案
 */
export const showAnswer = (): AppThunk => (dispatch, getState) => {
    const state = getState()

    const questionLength = selectQuetionsLength(state)

    if (!questionLength) {
        console.error('questionLengths 为 undefined 或 0')
    } else {
        dispatch(answerShown({ questionLength }))
    }

    // set result
    const questionSetId = selectCurrentQuestionSet(state)?.id

    if (!questionSetId) {
        console.error('questionSetId 为 undefined')
        return
    }

    const practiceMode = state.questionSet.practiceMode

    switch (practiceMode) {
        case PracticeMode.Chapter:
            dispatch(finishQuestionSet({ questionSetId, isRight: false }))
            break
        case PracticeMode.Notebook:
            dispatch(finishNotebookQuestionSet(questionSetId))
            break
        default:
            console.log(`unhandled practice mode: ${practiceMode}`)
    }
}

/**
 * 选择某个选项
 */
export const pickOption =
    ({
        questionIndex,
        optionIndex,
    }: {
        questionIndex: number
        optionIndex: number
    }): AppThunk =>
    async (dispatch, getState) => {
        const stateBefore = getState()
        const isDoneBefore = selectIsDone(stateBefore)

        if (isDoneBefore) {
            console.log('已完成该题，无法再选择')
            return
        }

        dispatch(optionSelected({ questionIndex, optionIndex }))
    }
