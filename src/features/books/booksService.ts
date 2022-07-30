import { splitApi } from "../../store/query/splitApi";
import type { Category, Book } from "./booksTypes";

export const booksApi = splitApi.injectEndpoints({
    endpoints: (build) => ({
        getCategoriyes: build.query<Category[], void>({
            query: () => "categories",
            transformResponse: (res: { categories: Category[] }) =>
                res.categories,
        }),
        getBooks: build.query<Book[], void>({
            query: () => "books",
            transformResponse: (res: { books: Book[] }) => res.books,
        }),
    }),
});

export const { useGetCategoriyesQuery, useGetBooksQuery } = booksApi;
