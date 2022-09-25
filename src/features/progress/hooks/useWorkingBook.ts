import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
    selectBookById,
    selectSectionAndChapterTitle,
} from '../../books/booksSlice'
import { useGetBookContentQuery } from '../../books/booksService'
import { selectProgressByBook } from '../progressSlice'
import { useEffect } from 'react'
import { getProgressByBookId } from '../progressThunks'

export function useWorkingBook() {
    const bookId = useAppSelector((state) => state.progress.workingBook)

    const { isDone, questionSetIndex, chapterTitle, sectionTitle } =
        useBookProgress(bookId)

    const book = useAppSelector(selectBookById(bookId))

    useGetBookContentQuery(bookId!, {
        skip: bookId === undefined,
    })

    return {
        book,
        isDone,
        sectionTitle,
        chapterTitle,
        questionSetIndex,
    }
}

export function useBookProgress(bookId?: string) {
    const dispatch = useAppDispatch()
    useEffect(() => {
        bookId && dispatch(getProgressByBookId(bookId))
    }, [bookId, dispatch])
    const progress = useAppSelector(selectProgressByBook(bookId))

    const hasProgressDetail = progress !== undefined && progress !== 1

    const isDone = progress === 1
    const sectionId = hasProgressDetail ? progress.sectionId : undefined
    const chapterId = hasProgressDetail ? progress.chapterId : undefined
    const questionSetIndex = hasProgressDetail
        ? progress.questionSetIndex
        : undefined

    const result = useAppSelector(
        selectSectionAndChapterTitle(bookId, sectionId, chapterId),
    )

    return {
        isDone,
        sectionTitle: result?.sectionTitle,
        chapterTitle: result?.chapterTitle,
        questionSetIndex,
    }
}
