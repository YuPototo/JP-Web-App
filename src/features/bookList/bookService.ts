import { splitApi } from "../../store/query";
import type { GetCategoriyesResponse, TopCategoryOutput } from "./types";

export const booksApi = splitApi.injectEndpoints({
    endpoints: (build) => ({
        getCategoriyes: build.query<TopCategoryOutput[], void>({
            query: () => "categories",
            transformResponse: (response: GetCategoriyesResponse) =>
                response.categories,
        }),
    }),
});

export const { useGetCategoriyesQuery } = booksApi;
