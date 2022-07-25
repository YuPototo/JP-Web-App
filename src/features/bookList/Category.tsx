import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import stringifyRtkQuerryError from "../../store/utils/stringifyRtkQuerryError";
import {
    selectTopCategories,
    pickTopCategory,
    selectChildCategories,
    pickChildCategory,
} from "./bookListSlice";
import { useGetCategoriyesQuery } from "./bookService";

export default function CategoryNav() {
    const { isLoading, error } = useGetCategoriyesQuery();

    return (
        <div className="my-4">
            {isLoading && <div>loading...</div>}
            <TopCategoryNav />
            <ChildrenCategoryNav />
            {error && <div>{stringifyRtkQuerryError(error)}</div>}
        </div>
    );
}

function TopCategoryNav() {
    const dispatch = useAppDispatch();
    const topCategories = useAppSelector(selectTopCategories);
    const handlePickTopCategory = (key: string) => {
        dispatch(pickTopCategory(key));
    };
    const selectedCategories = useAppSelector(
        (state) => state.bookList.selectedCategories
    );
    return (
        <div className="my-2">
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

function ChildrenCategoryNav() {
    const dispatch = useAppDispatch();

    const childCategories = useAppSelector(selectChildCategories);

    const selectedCategories = useAppSelector(
        (state) => state.bookList.selectedCategories
    );

    const handlePickChildCategory = (index: number, key: string) => {
        dispatch(
            pickChildCategory({
                index,
                key,
            })
        );
    };

    if (!childCategories) return <></>;

    return (
        <div className="m-2">
            {childCategories.map((categoryList, index) => (
                <div key={index} className="my-4">
                    {categoryList.map((category) => (
                        <span
                            key={category.key}
                            className={clsx(
                                "mx-4 bg-yellow-50 p-2 hover:cursor-pointer hover:bg-yellow-300",
                                selectedCategories?.childrenKeys[index] ===
                                    category.key && "bg-yellow-300"
                            )}
                            onClick={() =>
                                handlePickChildCategory(index, category.key)
                            }
                        >
                            {category.displayName}
                        </span>
                    ))}
                </div>
            ))}
        </div>
    );
}
