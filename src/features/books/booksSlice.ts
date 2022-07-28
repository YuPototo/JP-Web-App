import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import type {
    Book,
    TopCategoryKey,
    SubCategoryKey,
    SubCategoryMetaType,
    CategoryTree,
} from "./booksTypes";
import { booksApi } from "./booksService";

interface BookListState {
    categories: CategoryTree;
    selectedCategories?: {
        topKey: TopCategoryKey;
        subCategories: {
            [key: SubCategoryMetaType]: SubCategoryKey;
        };
    };
    books: Book[];
}

const initialState: BookListState = {
    categories: [
        {
            key: "jlpt",
            displayName: "JLPT",
            subCategorySeq: ["jlptLevel", "practiceDomain"],
            subCategories: {
                jlptLevel: [
                    { key: "n1", displayName: "N1" },
                    { key: "n2", displayName: "N2" },
                    { key: "n3", displayName: "N3" },
                ],
                practiceDomain: [
                    { key: "read", displayName: "阅读" },
                    { key: "words", displayName: "文字词汇" },
                ],
            },
        },
        {
            key: "study",
            displayName: "学习辅助",
            subCategorySeq: ["studySubMeta"],
            subCategories: {
                studySubMeta: [
                    {
                        key: "newStandardJP",
                        displayName: "新标日",
                    },
                    {
                        key: "other",
                        displayName: "其他",
                    },
                ],
            },
        },
    ],

    //@ts-ignore
    books: [
        {
            title: "abc",
            id: "62dfa04e2391de581a76ecdc",
            categories: {
                study: {
                    studySubMeta: ["newStandardJP"],
                },
            },
        },
        {
            title: "n1 阅读",
            id: "62e1d10885a923ba6e1acc25",
            categories: {
                jlpt: {
                    jlptLevel: ["n1"],
                    practiceDomain: ["read"],
                },
            },
        },
        {
            title: "n1 单词",
            id: "62e1d10885a923ba6e1acc25",
            categories: {
                jlpt: {
                    jlptLevel: ["n1"],
                    practiceDomain: ["words"],
                },
            },
        },
    ],
};

export const bookListSlice = createSlice({
    name: "bookList",
    initialState,
    reducers: {
        pickTopCategory: (state, action: PayloadAction<string>) => {
            if (state.selectedCategories?.topKey === action.payload) return;
            state.selectedCategories = {
                topKey: action.payload,
                subCategories: {},
            };
        },

        pickSubCategory: (
            state,
            payload: PayloadAction<{
                metaType: SubCategoryMetaType;
                key: SubCategoryKey;
            }>
        ) => {
            const { metaType, key } = payload.payload;
            if (!state.selectedCategories) {
                console.error(
                    "pickSubCategory: selectedCategories is undefined"
                );
                return;
            }
            state.selectedCategories.subCategories[metaType] = key;
        },
    },
    // extraReducers: (builder) => {
    //     builder.addMatcher(
    //         booksApi.endpoints.getCategoriyes.matchFulfilled,
    //         (state, { payload }) => {
    //             state.categories = payload;
    //         }
    //     );
    // },
});

export const { pickTopCategory, pickSubCategory } = bookListSlice.actions;

/* selectors */
export const selectTopCategories = (state: RootState) => {
    return state.bookList.categories.map((el) => ({
        key: el.key,
        displayName: el.displayName,
    }));
};

/**
 * selectMetaTypeByTopKey
 */
export const selectMetaTypeByTopKey =
    (topKey: TopCategoryKey) => (state: RootState) => {
        const topCategory = state.bookList.categories.find(
            (category) => category.key === topKey
        );
        if (!topCategory) {
            console.error(`topCategory with key ${topKey} is not found`);
            return;
        }
        return topCategory.subCategorySeq;
    };

export const selectSubcategoryByMetaType =
    (topKey: TopCategoryKey, metaType: SubCategoryMetaType) =>
    (state: RootState) => {
        const topCategory = state.bookList.categories.find(
            (category) => category.key === topKey
        );
        if (!topCategory) {
            console.error(`topCategory with key ${topKey} is not found`);
            return;
        }
        return topCategory.subCategories[metaType];
    };

export const selectBooksByCategory = (state: RootState) => {
    const { selectedCategories } = state.bookList;
    if (!selectedCategories) {
        return state.bookList.books;
    }

    const { topKey, subCategories } = selectedCategories;

    let books = state.bookList.books.filter(
        (book) => topKey in book.categories
    );

    const selectedSubMetaTypes = Object.keys(subCategories);

    for (const metaType of selectedSubMetaTypes) {
        const subKey = subCategories[metaType];
        books = books.filter((book) => {
            const topCategory = book.categories[topKey];
            return topCategory[metaType]?.includes(subKey);
        });
    }

    return books;
};

export default bookListSlice.reducer;
