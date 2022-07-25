/**
 * category api return type, same as backend api
 */
export interface BaseCategory {
    key: string;
    displayName: string;
}

type BaseCategoryArray = BaseCategory[];

type metaType = string;

type SubCategoryOutput = { [key: metaType]: BaseCategoryArray };

export interface TopCategoryOutput extends BaseCategory {
    subCategorySequence: metaType[];
    subCategories: SubCategoryOutput;
}

export interface GetCategoriyesResponse {
    categories: TopCategoryOutput[];
}

/**
 *  category types in store
 */
export interface TopCategory extends BaseCategory {
    subCategories: BaseCategory[][];
}
