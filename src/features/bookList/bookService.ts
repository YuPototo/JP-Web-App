import { splitApi } from "../../store/query";

export const booksApi = splitApi.injectEndpoints({
    endpoints: (build) => ({
        getCategoriyes: build.query<any, void>({
            query: () => "categories",
        }),
    }),
});

export const { useGetCategoriyesQuery } = booksApi;
