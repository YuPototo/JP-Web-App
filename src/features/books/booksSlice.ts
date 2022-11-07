import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'
import { booksApi, selectContentByBook } from './booksService'
import { getOpenSection } from './utils/getOpenSection'
import { selectChapterDonesByBook } from '../chapterDone/chapterDoneService'
import { CategoryKey, IBook, ICategory } from './booksTypes'
import { selectProgressByBook } from '../progress/progressSlice'

export interface BooksState {
    categories: ICategory[]
    selectedCategoryKeys: CategoryKey[]
    books: IBook[]
    currentBookId: string | null
}

const initialState: BooksState = {
    categories: [],
    selectedCategoryKeys: [], // 第1个元素表示第1层 category，第2个元素表示第2层 category
    books: [],
    currentBookId: null,
}

export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        bookViewed: (state, { payload }: PayloadAction<string>) => {
            state.currentBookId = payload
        },
        categoryPicked: (
            state,
            action: PayloadAction<{ categoryLevel: number; key: string }>,
        ) => {
            const { categoryLevel: index, key } = action.payload

            if (index > state.selectedCategoryKeys.length) {
                console.error(
                    `categoryPicked: index ${index} is larger than selectedCategoryKeys.length ${state.selectedCategoryKeys.length}`,
                )
                return
            }

            if (index === 0) {
                if (state.selectedCategoryKeys[0] === key) {
                    state.selectedCategoryKeys = [] // 反选
                } else {
                    state.selectedCategoryKeys = [key]
                }
            } else if (index === 1) {
                if (state.selectedCategoryKeys[1] === key) {
                    state.selectedCategoryKeys.splice(1, 1)
                } else {
                    state.selectedCategoryKeys = [
                        state.selectedCategoryKeys[0] as string, // Tech debt: remove as
                        key,
                    ]
                }
            } else if (index === 2) {
                if (state.selectedCategoryKeys[2] === key) {
                    state.selectedCategoryKeys.splice(2, 1)
                } else {
                    state.selectedCategoryKeys = [
                        state.selectedCategoryKeys[0] as string, // Tech debt: remove as
                        state.selectedCategoryKeys[1] as string,
                        key,
                    ]
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                booksApi.endpoints.getCategories.matchFulfilled,
                (state, { payload }) => {
                    state.categories = payload
                },
            )
            .addMatcher(
                booksApi.endpoints.getBooks.matchFulfilled,
                (state, { payload }) => {
                    state.books = payload
                },
            )
    },
})

export const { categoryPicked, bookViewed } = booksSlice.actions

/* selectors */
export const selectContentProgress =
    (bookId: string) =>
    (
        state: RootState,
    ): { openSectionIndex: number; nextChapterId?: string } | undefined => {
        const sections = selectContentByBook(bookId)(state).data

        if (!sections) {
            /**
             * Section 不存在。可能的原因：还没有获取 contents
             */
            return
        }

        // 如果有 progress，优先返回 progress
        const progress = selectProgressByBook(bookId)(state)
        if (progress) {
            if (progress === 1) {
                // case 1: 做完 book 了
                return
            } else {
                // case 2：有进度
                const sectionId = progress.sectionId
                const sectionIndex = sections.findIndex(
                    (section) => section.id === sectionId,
                )
                return {
                    openSectionIndex: sectionIndex,
                    nextChapterId: progress.chapterId,
                }
            }
        }

        // 没有 progress，返回第1个没做完的 chapter 及其所在的 section
        const chapterDones = selectChapterDonesByBook(bookId)(state).data
        if (!chapterDones) {
            return { openSectionIndex: 0 }
        }

        return getOpenSection(sections, chapterDones)
    }

/**
 * 给定 Category level 和 state，返回被选中的 category 的 chidlren
 * 假定只有前2层 category 会有 children
 */
export const selectChildrenByLevel =
    (categoryLevel: number) => (state: RootState) => {
        const categories = state.books.categories
        const selectedCategoryKeys = state.books.selectedCategoryKeys
        if (categoryLevel === 0) {
            const key = selectedCategoryKeys?.[0]
            return categories.find((c) => c.key === key)?.children
        } else if (categoryLevel === 1) {
            const key_0 = selectedCategoryKeys?.[0]
            const parentCategories = categories.find(
                (c) => c.key === key_0,
            )?.children
            const key_1 = selectedCategoryKeys?.[1]
            return parentCategories?.find((c) => c.key === key_1)?.children
        } else {
            return
        }
    }

export const selectBooksByCategory = (state: RootState) => {
    const selectedCategoryKeys = state.books.selectedCategoryKeys
    const books = state.books.books.filter((book) => !book.hidden)

    const selectedCategoryLength = selectedCategoryKeys.length

    let booksOutput = books
    if (selectedCategoryLength === 0) {
        // 啥也不用干
    } else if (selectedCategoryLength === 1) {
        const key = selectedCategoryKeys[0]
        booksOutput = books.filter((b) => b.category?.key === key)
    } else if (selectedCategoryLength === 2) {
        const key_0 = selectedCategoryKeys[0]
        const key_1 = selectedCategoryKeys[1]
        booksOutput = books.filter(
            (b) =>
                b.category?.key === key_0 && b.category?.child?.key === key_1,
        )
    } else if (selectedCategoryLength === 3) {
        const key_0 = selectedCategoryKeys[0]
        const key_1 = selectedCategoryKeys[1]
        const key_2 = selectedCategoryKeys[2]
        booksOutput = books.filter(
            (b) =>
                b.category?.key === key_0 &&
                b.category?.child?.key === key_1 &&
                b.category?.child?.child?.key === key_2,
        )
    } else {
        console.error('不允许4层及以上 cateory')
    }

    // weight 大的在前面
    return booksOutput.sort((a, b) => b.weight - a.weight)
}

export const selectBookById = (bookId?: string) => (state: RootState) => {
    return state.books.books.find((book) => book.id === bookId)
}

export const selectSectionAndChapterTitle =
    (bookId?: string, sectionId?: string, chapterId?: string) =>
    (state: RootState) => {
        if (!bookId || !sectionId || !chapterId) {
            return
        }

        const sections = selectContentByBook(bookId)(state).data

        if (!sections) {
            return
        }

        const section = sections.find((section) => section.id === sectionId)

        if (!section) {
            console.error('selectSectionTitle: 找不到 section')
            return
        }

        const chapter = section.chapters.find(
            (chapter) => chapter.id === chapterId,
        )

        if (!chapter) {
            console.error('selectSectionTitle: 找不到 chapter')
            return
        }

        return { sectionTitle: section.title, chapterTitle: chapter.title }
    }

export const selectSectionByChapterId =
    (chapterId: string) => (state: RootState) => {
        const bookId = state.books.currentBookId

        if (!bookId) {
            console.error('selectSectionByChapterId: currentBookId is null')
            return
        }

        const sections = selectContentByBook(bookId)(state).data

        if (!sections) {
            return
        }

        for (const section of sections) {
            const chapter = section.chapters.find(
                (chapter) => chapter.id === chapterId,
            )

            if (chapter) {
                return section
            }
        }
    }

export const selectFirstChapterId = (state: RootState) => {
    const bookId = state.books.currentBookId

    if (!bookId) {
        console.error('selectSectionByChapterId: currentBookId is null')
        return
    }

    const sections = selectContentByBook(bookId)(state).data

    if (!sections) {
        return
    }

    return sections[0]?.chapters[0]?.id
}

export default booksSlice.reducer
