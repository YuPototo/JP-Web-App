/* cateogry */
export type TopCategoryKey = string;
export type SubCategoryKey = string;
export type SubCategoryMetaType = string;

export interface BaseCategory {
    key: TopCategoryKey | SubCategoryKey;
    displayName: string;
}

type SubCategory = BaseCategory;

export interface TopCategory extends BaseCategory {
    subCategorySeq: SubCategoryMetaType[];
    subCategories: {
        [key: SubCategoryMetaType]: SubCategory[];
    };
}

export type CategoryTree = TopCategory[];

/* books */
export interface Book {
    id: string;
    title: string;
    categories: {
        [key: TopCategoryKey]: {
            [key: SubCategoryMetaType]: SubCategoryKey[];
        };
    };
}
