import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import type { TopCategory } from "./types";

interface BookListState {
    categories: TopCategory[];
    selectedCategories?: {
        topKey: string;
        childrenKeys: string[];
    };
}

const TEMP_CATEGORIES = [
    {
        key: "study",
        displayName: "学习",
        subCategories: [
            [
                {
                    key: "newStandardJP",
                    displayName: "新标日",
                },
                {
                    key: "other",
                    displayName: "其他",
                },
            ],
        ],
    },
    {
        key: "jlpt",
        displayName: "JLPT",
        subCategories: [
            [
                {
                    key: "n1",
                    displayName: "N1",
                },
                {
                    key: "n2",
                    displayName: "N2",
                },
            ],
            [
                {
                    key: "words",
                    displayName: "文字词汇",
                },
                {
                    key: "read",
                    displayName: "阅读",
                },
            ],
        ],
    },
];
const initialState: BookListState = {
    categories: TEMP_CATEGORIES,
    selectedCategories: { topKey: "jlpt", childrenKeys: [] },
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
