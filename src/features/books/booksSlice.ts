import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import type { Book, Category, CategoryKey } from "./booksTypes";
import { booksApi } from "./booksService";

export interface BookListState {
    categories: Category[];
    selectedCategoryKeys: CategoryKey[];
    books: Book[];
}

const initialState: BookListState = {
    categories: [],
    selectedCategoryKeys: [],
    books: [],
};

export const bookListSlice = createSlice({
    name: "bookList",
    initialState,
    reducers: {
        setCategoryKey: (
            state,
            action: PayloadAction<{ categoryLevel: number; key: string }>
        ) => {
            const { categoryLevel: index, key } = action.payload;

            if (index > state.selectedCategoryKeys.length) {
                console.error(
                    `setCategoryKey: index ${index} is larger than selectedCategoryKeys.length ${state.selectedCategoryKeys.length}`
                );
                return;
            }

            if (index === 0) {
                state.selectedCategoryKeys = [key];
            } else if (index === 1) {
                state.selectedCategoryKeys = [
                    state.selectedCategoryKeys[0],
                    key,
                ];
            } else if (index === 2) {
                state.selectedCategoryKeys = [
                    state.selectedCategoryKeys[0],
                    state.selectedCategoryKeys[1],
                    key,
                ];
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                booksApi.endpoints.getCategoriyes.matchFulfilled,
                (state, { payload }) => {
                    state.categories = payload;
                }
            )
            .addMatcher(
                booksApi.endpoints.getBooks.matchFulfilled,
                (state, { payload }) => {
                    state.books = payload;
                }
            );
    },
});

export const { setCategoryKey } = bookListSlice.actions;

/* selectors */

/**
 * 给定 Category level 和 state，返回被选中的 category 的 chidlren
 * 假定只有前2层 category 会有 children
 */
export const selectChildrenByLevel =
    (categoryLevel: number) => (state: RootState) => {
        const categories = state.bookList.categories;
        const selectedCategoryKeys = state.bookList.selectedCategoryKeys;
        if (categoryLevel === 0) {
            const key = selectedCategoryKeys?.[0];
            return categories.find((c) => c.key === key)?.children;
        } else if (categoryLevel === 1) {
            const key_0 = selectedCategoryKeys?.[0];
            const parentCategories = categories.find(
                (c) => c.key === key_0
            )?.children;
            const key_1 = selectedCategoryKeys?.[1];
            return parentCategories?.find((c) => c.key === key_1)?.children;
        } else {
            return;
        }
    };

export const selectBooksByCategory = (state: RootState) => {
    const selectedCategoryKeys = state.bookList.selectedCategoryKeys;
    const books = state.bookList.books;

    const selectedCategoryLength = selectedCategoryKeys.length;
    if (selectedCategoryLength === 0) {
        return books;
    } else if (selectedCategoryLength === 1) {
        const key = selectedCategoryKeys[0];
        return books.filter((b) => b.category.key === key);
    } else if (selectedCategoryLength === 2) {
        const key_0 = selectedCategoryKeys[0];
        const key_1 = selectedCategoryKeys[1];
        return books.filter(
            (b) => b.category.key === key_0 && b.category.child?.key === key_1
        );
    } else if (selectedCategoryLength === 3) {
        const key_0 = selectedCategoryKeys[0];
        const key_1 = selectedCategoryKeys[1];
        const key_2 = selectedCategoryKeys[2];
        return books.filter(
            (b) =>
                b.category.key === key_0 &&
                b.category.child?.key === key_1 &&
                b.category.child?.child?.key === key_2
        );
    } else {
        console.error("不允许4层及以上 cateory");
        return books;
    }
};
export default bookListSlice.reducer;
