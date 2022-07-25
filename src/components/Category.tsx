import clsx from "clsx";
import React from "react";
import { mainCategoris, categoryKeys } from "../data/category";

export default function Category() {
    const [category, setCategory] = React.useState<any>(null);
    const [subCategories, setSubCategories] = React.useState<any>([]);

    const childCategories =
        category &&
        mainCategoris.filter((el) => el.key === category)[0].childCategories;

    const handleClickSubcategory = (el: any, index: number) => {
        const newSubCategories = subCategories;
        newSubCategories[index] = el.key;
        setSubCategories(newSubCategories);
        console.log(subCategories);
    };

    return (
        <div>
            <div className="my-2">
                {categoryKeys.map((el) => (
                    <span
                        className={clsx(
                            "mx-2 bg-blue-50 px-2 py-1 hover:cursor-pointer hover:bg-blue-200",
                            category === el && "bg-blue-200"
                        )}
                        onClick={() => setCategory(el)}
                        key={el}
                    >
                        {el}
                    </span>
                ))}
            </div>
            {category && (
                <div>
                    {childCategories.map(
                        (childCategory: any, index: number) => (
                            <div className="my-4" key={index}>
                                {childCategory.map((el: any) => (
                                    <span
                                        className={clsx(
                                            "mx-2 bg-yellow-50 px-3 py-2 hover:cursor-pointer hover:bg-yellow-200",
                                            subCategories[index] === el.key &&
                                                "bg-yellow-200"
                                        )}
                                        onClick={() =>
                                            handleClickSubcategory(el, index)
                                        }
                                        key={el.key}
                                    >
                                        {el.display}
                                    </span>
                                ))}
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
}
