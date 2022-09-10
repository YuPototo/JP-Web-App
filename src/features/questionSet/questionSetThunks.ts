/* thunks */

import { AppThunk } from '../../store/store'
import { finishQuestionSet } from '../practiceChapter/practiceChapterThunks'
import {
    fillOptions,
    selectCurrentQuestionSet,
    selectIsDone,
    selectQuetionsLength,
    setOptionSelected,
} from './questionSetSlice'

/**
 * 直接选择答案
 */
export const fillOptionsThunk = (): AppThunk => (dispatch, getState) => {
    const state = getState()

    const questionLength = selectQuetionsLength(state)

    if (!questionLength) {
        console.error('questionLengths 为 undefined 或 0')
    } else {
        dispatch(fillOptions({ questionLength }))
    }

    // set result
    const questionSetId = selectCurrentQuestionSet(state)?.id

    if (!questionSetId) {
        console.error('questionSetId 为 undefined')
        return
    }

    dispatch(finishQuestionSet({ questionSetId, isRight: false }))
}

/**
 * 选择某个选项
 */
export const pickOptionThunk =
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

        dispatch(setOptionSelected({ questionIndex, optionIndex }))
    }
