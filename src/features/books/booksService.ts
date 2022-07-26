import { splitApi } from "../../store/query/splitApi";
import type { TopCategory } from "./booksTypes";

export const booksApi = splitApi.injectEndpoints({
    endpoints: (build) => ({
        getCategoriyes: build.query<TopCategory[], void>({
            query: () => "categories",
            transformResponse: (res: { categories: TopCategory[] }) =>
                res.categories,
        }),
    }),
});

export const { useGetCategoriyesQuery } = booksApi;
