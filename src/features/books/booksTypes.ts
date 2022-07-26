export interface BaseCategory {
    key: string;
    displayName: string;
}

export interface TopCategory extends BaseCategory {
    subCategories: BaseCategory[][];
}
