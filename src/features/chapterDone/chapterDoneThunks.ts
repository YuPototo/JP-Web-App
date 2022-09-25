import type { AppThunk } from '../../store/store'
import { chapterDoneApi } from './chapterDoneService'

export const finishChapter =
    (chapterId: string): AppThunk =>
    async (dispatch, getState) => {
        const state = getState()
        const bookId = state.books.currentBookId
        if (!bookId) {
            console.error('doneInChapter: bookId is null')
        } else {
            dispatch(
                chapterDoneApi.endpoints.addChapterDone.initiate({
                    bookId,
                    chapterId,
                }),
            )
        }
    }
