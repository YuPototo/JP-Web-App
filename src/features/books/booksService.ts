import { splitApi } from "../../store/query/splitApi";
import type { CategoryTree } from "./booksTypes";

export const booksApi = splitApi.injectEndpoints({
    endpoints: (build) => ({
        getCategoriyes: build.query<CategoryTree, void>({
            query: () => "categories",
            transformResponse: (res: { categories: CategoryTree }) =>
                res.categories,
        }),
    }),
});

export const { useGetCategoriyesQuery } = booksApi;
