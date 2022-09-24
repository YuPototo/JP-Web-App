import { useEffect, useState } from 'react'
import { useAppSelector } from '../../../store/hooks'
import progressStorage from '../progressStorage'
import {
    selectBookById,
    selectSectionAndChapterTitle,
} from '../../books/booksSlice'
import { useGetBookContentQuery } from '../../books/booksService'

export function useWorkingBook() {
    const [workingBookId, setWorkingBookId] = useState<string | undefined>()

    const { isDone, questionSetIndex, chapterTitle, sectionTitle } =
        useBookProgress(workingBookId)

    useEffect(() => {
        const bookId = progressStorage.getWorkingBook()
        setWorkingBookId(bookId ? bookId : undefined)
    }, [])

    const book = useAppSelector(selectBookById(workingBookId))

    useGetBookContentQuery(workingBookId!, {
        skip: workingBookId === undefined,
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
    const [sectionId, setSectionId] = useState<string | undefined>()
    const [chapterId, setChapterId] = useState<string | undefined>()
    const [questionSetIndex, setQuestionSetIndex] = useState<
        number | undefined
    >()
    const [isDone, setIsDone] = useState(false)

    useEffect(() => {
        if (!bookId) return
        const progressDetail = progressStorage.getProgressDetail(bookId)
        if (progressDetail) {
            if ('isDone' in progressDetail) {
                setIsDone(true)
            } else {
                setSectionId(progressDetail.sectionId)
                setChapterId(progressDetail.chapterId)
                setQuestionSetIndex(progressDetail.questionSetIndex)
            }
        }
    }, [bookId])

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
