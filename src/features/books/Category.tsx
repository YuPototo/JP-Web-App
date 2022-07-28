import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import stringifyRtkQuerryError from "../../store/storeUtils/stringifyRtkQuerryError";
import {
    selectTopCategories,
    pickTopCategory,
    selectMetaTypeByTopKey,
    selectSubcategoryByMetaType,
    pickSubCategory,
} from "./booksSlice";
import { useGetCategoriyesQuery } from "./booksService";
import type {
    SubCategoryKey,
    SubCategoryMetaType,
    TopCategoryKey,
} from "./booksTypes";

export default function CategoryNav() {
    const { isLoading, error } = useGetCategoriyesQuery();

    const selectedTopKey = useAppSelector(
        (state) => state.bookList.selectedCategories?.topKey
    );

    return (
        <div className="my-4">
            {isLoading ? (
                <div className="skeleton mb-4 h-6  w-60"></div>
            ) : (
                <div>
                    <TopCategoryNav />
                    {selectedTopKey && (
                        <SubcategoryNav2 topKey={selectedTopKey} />
                    )}
                </div>
            )}

            {error && (
                <span className="text-red-500">
                    {`获取内容分类出错：${stringifyRtkQuerryError(error)}`}
                </span>
            )}
        </div>
    );
}

function TopCategoryNav({ className }: { className?: string }) {
    const dispatch = useAppDispatch();
    const topCategories = useAppSelector(selectTopCategories);
    const handlePickTopCategory = (key: string) => {
        dispatch(pickTopCategory(key));
    };
    const selectedCategories = useAppSelector(
        (state) => state.bookList.selectedCategories
    );
    return (
        <div className={className}>
            {topCategories.map((category) => (
                <span
                    className={clsx(
                        "m-2 bg-green-50 p-2 hover:cursor-pointer hover:bg-green-300",
                        selectedCategories?.topKey === category.key &&
                            "bg-green-300"
                    )}
                    key={category.key}
                    onClick={() => handlePickTopCategory(category.key)}
                >
                    {category.displayName}
                </span>
            ))}
        </div>
    );
}

function SubcategoryNav2({ topKey }: { topKey: TopCategoryKey }) {
    const metaTypes = useAppSelector(selectMetaTypeByTopKey(topKey));
    if (!metaTypes) return <></>;
    return (
        <div>
            {metaTypes.map((metaType) => (
                <SubCategoryList
                    key={metaType}
                    topKey={topKey}
                    metaType={metaType}
                />
            ))}
        </div>
    );
}

function SubCategoryList({
    metaType,
    topKey,
}: {
    metaType: SubCategoryMetaType;
    topKey: TopCategoryKey;
}) {
    const dispatch = useAppDispatch();

    const subcategoryList = useAppSelector(
        selectSubcategoryByMetaType(topKey, metaType)
    );

    const selectedSubcategoryKey = useAppSelector(
        (state) => state.bookList.selectedCategories?.subCategories[metaType]
    );

    const handleSelectSubCategory = (subCategoryKey: SubCategoryKey) => {
        dispatch(pickSubCategory({ metaType, key: subCategoryKey }));
    };

    return (
        <div className="m-6">
            {subcategoryList?.map((subCatetory) => (
                <span
                    className={clsx(
                        selectedSubcategoryKey === subCatetory.key &&
                            "bg-yellow-300",
                        "m-2 p-2 hover:cursor-pointer hover:bg-yellow-300"
                    )}
                    key={subCatetory.key}
                    onClick={() => handleSelectSubCategory(subCatetory.key)}
                >
                    {subCatetory.displayName}
                </span>
            ))}
        </div>
    );
}
