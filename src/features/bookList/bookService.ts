import { splitApi } from "../../store/query";
import type {
    BaseCategory,
    GetCategoriyesResponse,
    TopCategory,
    TopCategoryOutput,
} from "./types";

export function transformCategoryRes(
    data: GetCategoriyesResponse
): TopCategory[] {
    const categories = data.categories;

    const result = categories.map((topCategory) => {
        const subCategories: BaseCategory[][] = [];

        for (const metaType of topCategory.subCategorySequence) {
            subCategories.push(topCategory.subCategories[metaType]);
        }
        return {
            key: topCategory.key,
            displayName: topCategory.displayName,
            subCategories,
        };
    });

    return result;
}

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
