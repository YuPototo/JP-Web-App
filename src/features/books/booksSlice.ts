import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'
import type { BooksState } from './booksTypes'
import { booksApi, selectContentByBook } from './booksService'
import { getOpenSection } from './utils/getOpenSection'
import { selectChapterDonesByBook } from '../chapterDone/chapterDoneService'

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
        setCurrentBookId: (state, { payload }: PayloadAction<string>) => {
            state.currentBookId = payload
        },
        setCategoryKey: (
            state,
            action: PayloadAction<{ categoryLevel: number; key: string }>,
        ) => {
            const { categoryLevel: index, key } = action.payload

            if (index > state.selectedCategoryKeys.length) {
                console.error(
                    `setCategoryKey: index ${index} is larger than selectedCategoryKeys.length ${state.selectedCategoryKeys.length}`,
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

export const { setCategoryKey, setCurrentBookId } = booksSlice.actions

/* selectors */
export const selectContentProgress = (
    state: RootState,
): { openSectionIndex: number; nextChapterId?: string } => {
    const currentBookId = state.books.currentBookId

    if (!currentBookId) {
        return { openSectionIndex: 0 }
    }

    const bookContent = selectContentByBook(currentBookId)(state).data

    if (!bookContent) {
        return { openSectionIndex: 0 }
    }

    const chapterDones = selectChapterDonesByBook(currentBookId)(state).data
    if (!chapterDones) {
        return { openSectionIndex: 0 }
    }

    return getOpenSection(bookContent, chapterDones)
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
    if (selectedCategoryLength === 0) {
        return books
    } else if (selectedCategoryLength === 1) {
        const key = selectedCategoryKeys[0]
        return books.filter((b) => b.category.key === key)
    } else if (selectedCategoryLength === 2) {
        const key_0 = selectedCategoryKeys[0]
        const key_1 = selectedCategoryKeys[1]
        return books.filter(
            (b) => b.category.key === key_0 && b.category.child?.key === key_1,
        )
    } else if (selectedCategoryLength === 3) {
        const key_0 = selectedCategoryKeys[0]
        const key_1 = selectedCategoryKeys[1]
        const key_2 = selectedCategoryKeys[2]
        return books.filter(
            (b) =>
                b.category.key === key_0 &&
                b.category.child?.key === key_1 &&
                b.category.child?.child?.key === key_2,
        )
    } else {
        console.error('不允许4层及以上 cateory')
        return books
    }
}

export const selectBookById = (bookId?: string) => (state: RootState) => {
    return state.books.books.find((book) => book.id === bookId)
}

export default booksSlice.reducer
