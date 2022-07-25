const subCategoryJLPT = [
    { key: "n1", display: "n1" },
    { key: "n2", display: "n2" },
    { key: "n3", display: "n3" },
    { key: "n4", display: "n4" },
    { key: "n5", display: "n5" },
];

const subCategoryType = [
    { key: "read", display: "阅读" },
    { key: "listen", display: "听力" },
    { key: "words", display: "语言知识" },
];

export const mainCategoris = [
    {
        key: "jlpt",
        display: "JLPT",
        childCategories: [
            // 第1个 sub category
            subCategoryJLPT,

            // 第2个 sub category
            subCategoryType,
        ],
    },
    {
        key: "beginner",
        display: "学习",
        childCategories: [subCategoryType],
    },
];

export const categoryKeys = mainCategoris.map((el) => el.key);
