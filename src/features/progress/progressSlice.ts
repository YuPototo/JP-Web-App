import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store/store'
import {
    getCurrentSectionByChapterId,
    selectContentByBook,
} from '../books/booksService'

export interface ProgressDetail {
    sectionId: string
    chapterId: string
    questionSetIndex: number
}

export type AllProgressType = ProgressDetail | 1

interface ProgressState {
    workingBook?: string
    progressByBook: Record<string, AllProgressType> // 1 表示做完了
}

const initialState: ProgressState = {
    workingBook: undefined,
    progressByBook: {},
}

export const progressSlice = createSlice({
    name: 'progress',
    initialState,
    reducers: {
        workingBookChanged: (state, { payload }: PayloadAction<string>) => {
            state.workingBook = payload
        },
        progressChanged: (
            state,
            {
                payload,
            }: PayloadAction<{ progress: AllProgressType; bookId: string }>,
        ) => {
            const { bookId, progress } = payload
            state.progressByBook[bookId] = progress
        },
        progressRemoved: (state, { payload }: PayloadAction<string>) => {
            delete state.progressByBook[payload]
        },
    },
})

export const { workingBookChanged, progressChanged, progressRemoved } =
    progressSlice.actions
export default progressSlice.reducer

/* selectors */

export const selectProgressByBook =
    (bookId?: string | null) => (state: RootState) => {
        if (bookId) {
            return state.progress.progressByBook[bookId]
        }
    }

export const selectHasProgress = (bookId: string) => (state: RootState) => {
    return !!state.progress.progressByBook[bookId]
}

/**
 * 获取下一题的进度
 * @returns
 * 1. 如果出错，返回 undefined
 * 2. 如果有下一题，返回 ProgressDetail
 * 3. 如果做完了所有题，返回 1
 */
export const selectNextQuestionSetProgress = (
    state: RootState,
): ProgressDetail | undefined | 1 => {
    const questionSetIndex = state.practiceChapter.questionSetIndex
    const chapterId = state.practiceChapter.chapterId

    if (!chapterId) {
        console.error('selectNextQuestionSetProgress: 没有 chapter id')
        return
    }

    const questionSetCount = state.practiceChapter.results.length

    const bookId = state.books.currentBookId
    if (!bookId) {
        console.error('selectNextQuestionSetProgress: 没有 book id')
        return
    }

    // sections 有可能会不存在，比如从 cache 里被移除了
    // 先不处理这个情况
    const sections = selectContentByBook(bookId)(state).data

    if (!sections) {
        console.error('selectNextQuestionSetProgress: 没有 sections')
        return
    }

    // case 1. 下一题仍然在本 chapter 内
    const section = getCurrentSectionByChapterId(chapterId, sections)
    if (!section) {
        console.error('selectNextQuestionSetProgress: 找不到 section')
        return
    }

    if (questionSetIndex + 1 < questionSetCount) {
        return {
            chapterId,
            questionSetIndex: questionSetIndex + 1,
            sectionId: section.id,
        }
    }

    // 下一题不在本 chapter 内
    const chapterLength = section.chapters.length
    const chapterIndex = section.chapters.findIndex(
        (chapter) => chapter.id === chapterId,
    )

    if (chapterIndex < chapterLength - 1) {
        // case 2: 下一个 chapter 在同一个 section 中
        return {
            questionSetIndex: 0,
            chapterId: section.chapters[chapterIndex + 1]!.id,
            sectionId: section.id,
        }
    }

    const currentSectionIndex = sections.indexOf(section)
    const nextSection = sections[currentSectionIndex + 1]

    if (!nextSection) {
        // case 4: 没有下一个 section 了
        return 1
    } else {
        // case 5: 下一题在下一个 section 的第一个 chapter 内
        // 这里假定下一个 section 一定有 chapter
        return {
            questionSetIndex: 0,
            chapterId: nextSection.chapters[0]!.id,
            sectionId: nextSection.id,
        }
    }
}
