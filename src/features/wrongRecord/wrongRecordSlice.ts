import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface WrongRecordState {
    questionSetIds: string[]
    currentQuestionSetIndex: number
}

const initialState: WrongRecordState = {
    questionSetIds: [],
    currentQuestionSetIndex: 0,
}

export const wrongRecordSlice = createSlice({
    name: 'wrongRecord',
    initialState,
    reducers: {
        wrongbookPracticeStarted: (state) => {
            state.questionSetIds = []
            state.currentQuestionSetIndex = 0
        },
        wrongRecordLoaded: (state, { payload }: PayloadAction<string[]>) => {
            // 这条逻辑避免在复习错题过程中 reset questionSetIds
            if (state.questionSetIds.length === 0) {
                state.questionSetIds = payload
            }
        },
        wrongRecordPracticeChangedBy: (
            state,
            { payload }: PayloadAction<number>,
        ) => {
            state.currentQuestionSetIndex += payload
        },
    },
})

export const {
    wrongbookPracticeStarted,
    wrongRecordLoaded,
    wrongRecordPracticeChangedBy,
} = wrongRecordSlice.actions

export default wrongRecordSlice.reducer
