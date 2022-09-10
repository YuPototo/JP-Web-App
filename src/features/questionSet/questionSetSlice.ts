import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppStartListening } from '../../store/listenerMiddleware'
import { RootState } from '../../store/store'
import { finishQuestionSet } from '../practiceChapter/practiceChapterThunks'
import { questionSetApi } from './questionSetService'
import { PracticeMode, QuestionSetState } from './questionSetTypes'

const initialState: QuestionSetState = {
    questionSetId: null,
    practiceMode: null,
    optionsSelected: [],
    isError: false,
}

export const questionSetSlice = createSlice({
    name: 'questionSet',
    initialState,
    reducers: {
        initQuestionSet: (
            state,
            {
                payload,
            }: PayloadAction<{
                questionSetId: string
                practiceMode: PracticeMode
            }>,
        ) => {
            state.questionSetId = payload.questionSetId
            state.practiceMode = payload.practiceMode
            state.optionsSelected = []
            state.isError = false
        },
        setOptionSelected: (
            state,
            action: PayloadAction<{
                questionIndex: number
                optionIndex: number
            }>,
        ) => {
            const { questionIndex, optionIndex } = action.payload
            state.optionsSelected[questionIndex] = optionIndex
        },
        fillOptions: (
            state,
            { payload }: PayloadAction<{ questionLength: number }>,
        ) => {
            state.optionsSelected = Array(payload.questionLength).fill(-1)
        },
        setIsError: (state, { payload }: PayloadAction<boolean>) => {
            state.isError = payload
        },
    },
})

export const { setOptionSelected, fillOptions, initQuestionSet, setIsError } =
    questionSetSlice.actions

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

export default questionSetSlice.reducer

/* listenerMiddleware */
export const addQuestionSetListeners = (startListening: AppStartListening) => {
    startListening({
        actionCreator: setOptionSelected,
        effect: (_, { getState, dispatch }) => {
            const state = getState()
            const isDone = selectIsDone(state)
            if (!isDone) return

            // set result
            const isRight = selectIsRight(state)
            const questionSetId = selectCurrentQuestionSet(state)?.id

            if (!questionSetId) {
                console.error('questionSetId 为 undefined')
                return
            }

            const practiceMode = state.questionSet.practiceMode

            switch (practiceMode) {
                case PracticeMode.Chapter:
                    dispatch(finishQuestionSet({ questionSetId, isRight }))
                    break
                default:
                    console.log(`unhandled practice mode: ${practiceMode}`)
            }
        },
    })
}
