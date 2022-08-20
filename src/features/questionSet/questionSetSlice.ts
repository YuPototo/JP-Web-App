import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../../store/store'
import { doneInChapter } from '../practiceChapter/practiceChapterSlice'
import { questionSetApi } from './questionSetService'
import { startAppListening } from '../../store/store'

export interface QuestionSetState {
    questionSetId: string | null
    optionsSelected: number[]
}

const initialState: QuestionSetState = {
    questionSetId: null,
    optionsSelected: [],
}

export const questionSetSlice = createSlice({
    name: 'questionSet',
    initialState,
    reducers: {
        setQuestionSetId: (state, { payload }: PayloadAction<string>) => {
            state.questionSetId = payload
        },
        setOptionSelected: (
            state,
            action: PayloadAction<{
                questionIndex: number
                optionIndex: number
            }>
        ) => {
            const { questionIndex, optionIndex } = action.payload
            state.optionsSelected[questionIndex] = optionIndex
        },
        fillOptions: (
            state,
            { payload }: PayloadAction<{ questionLength: number }>
        ) => {
            state.optionsSelected = Array(payload.questionLength).fill(-1)
        },
        resetQuestionSet: (state) => {
            state.questionSetId = null
            state.optionsSelected = []
        },
    },
})

export const {
    setOptionSelected,
    fillOptions,
    resetQuestionSet,
    setQuestionSetId,
} = questionSetSlice.actions

/* selectors */
export const selectPickedIndex =
    (questionIndex: number) => (state: RootState) => {
        return state.questionSet.optionsSelected[questionIndex]
    }

export const selectCurrentQuestionSet = (state: RootState) => {
    const { questionSetId } = state.questionSet

    if (!questionSetId) {
        return
    }

    const { data: questionSet } =
        questionSetApi.endpoints.getQuestionSet.select(questionSetId)(state)

    return questionSet
}

// 当前的 questionSet 里有多少个 questions
export const selectQuetionsLength = (state: RootState) => {
    const questionSet = selectCurrentQuestionSet(state)

    if (!questionSet) {
        return
    }

    return questionSet.questions.length
}

export const selectIsRight = (state: RootState) => {
    const questionSet = selectCurrentQuestionSet(state)

    if (!questionSet) {
        return false
    }

    const { optionsSelected } = state.questionSet

    if (optionsSelected.length !== questionSet.questions.length) {
        return false
    }

    return optionsSelected.every((optionIndex, index) => {
        const question = questionSet.questions[index]
        if (!question) {
            return false
        }
        return optionIndex === question.answer
    })
}

export const selectIsDone = (state: RootState) => {
    const questionSet = selectCurrentQuestionSet(state)

    if (!questionSet) {
        return false
    }
    const { optionsSelected } = state.questionSet
    const nonEmptySelection = optionsSelected.filter((el) => el !== null) // 这段代码会排除掉 empty element
    return nonEmptySelection.length === questionSet.questions.length
}

// thunks
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
    dispatch(doneInChapter(questionSetId, false))
}

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

        const stateAfter = getState()
        const isDoneAfter = selectIsDone(stateAfter)
        if (!isDoneAfter) return

        // set result
        const isRight = selectIsRight(stateAfter)
        const questionSetId = selectCurrentQuestionSet(stateAfter)?.id

        if (!questionSetId) {
            console.error('questionSetId 为 undefined')
            return
        }

        dispatch(doneInChapter(questionSetId, isRight))
    }

export default questionSetSlice.reducer

/* listenerMiddleware */

startAppListening({
    actionCreator: setOptionSelected,
    effect: () => {
        console.log(1)
    },
})
