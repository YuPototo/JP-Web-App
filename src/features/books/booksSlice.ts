import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import type { TopCategory } from "./booksTypes";
import { booksApi } from "./booksService";

interface BookListState {
    categories: TopCategory[];
    selectedCategories?: {
        topKey: string;
        childrenKeys: string[];
    };
}

const initialState: BookListState = {
    categories: [],
};

export const bookListSlice = createSlice({
    name: "bookList",
    initialState,
    reducers: {
        pickTopCategory: (state, action: PayloadAction<string>) => {
            if (state.selectedCategories?.topKey === action.payload) return;
            state.selectedCategories = {
                topKey: action.payload,
                childrenKeys: [],
            };
        },
        pickChildCategory: (
            state,
            action: PayloadAction<{ index: number; key: string }>
        ) => {
            if (state.selectedCategories) {
                state.selectedCategories.childrenKeys[action.payload.index] =
                    action.payload.key;
            } else {
                console.error(
                    "action selectChildCategory error: bookList.selectedCategories is undefined"
                );
            }
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            booksApi.endpoints.getCategoriyes.matchFulfilled,
            (state, { payload }) => {
                state.categories = payload;
            }
        );
    },
});

export const { pickTopCategory, pickChildCategory } = bookListSlice.actions;

/* selectors */
export const selectTopCategories = (state: RootState) => {
    return state.bookList.categories.map((el) => ({
        key: el.key,
        displayName: el.displayName,
    }));
};

export const selectChildCategories = (state: RootState) => {
    const topCategoryKey = state.bookList.selectedCategories?.topKey;
    if (!topCategoryKey) return;
    const topCategory = state.bookList.categories.find(
        (category) => category.key === topCategoryKey
    );
    if (!topCategory) {
        console.error(`topCategory with key ${topCategoryKey} is not found`);
        return;
    }
    return topCategory.subCategories;
};

export default bookListSlice.reducer;
