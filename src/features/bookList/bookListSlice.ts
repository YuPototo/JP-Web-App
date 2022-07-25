import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookListState {
    value: number;
}

const initialState: BookListState = {
    value: 0,
};

export const bookListSlice = createSlice({
    name: "bookList",
    initialState,
    reducers: {
        setValue: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
});

export const { setValue } = bookListSlice.actions;

export default bookListSlice.reducer;
