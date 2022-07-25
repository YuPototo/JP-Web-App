import { transformCategoryRes } from "../bookService";
import type { GetCategoriyesResponse } from "../types";

describe("transformCategoryRes()", () => {
    it("should transform response data to right form", () => {
        const resData: GetCategoriyesResponse = {
            categories: [
                {
                    key: "study",
                    displayName: "学习",
                    subCategorySequence: ["studyMeta"],
                    subCategories: {
                        studyMeta: [
                            {
                                key: "newStandardJP",
                                displayName: "新标日",
                            },
                            {
                                key: "other",
                                displayName: "其他",
                            },
                        ],
                    },
                },
                {
                    key: "jlpt",
                    displayName: "JLPT",
                    subCategorySequence: ["jlptLevel", "questionType"],
                    subCategories: {
                        jlptLevel: [
                            {
                                key: "n1",
                                displayName: "N1",
                            },
                            {
                                key: "n2",
                                displayName: "N2",
                            },
                        ],
                        questionType: [
                            {
                                key: "words",
                                displayName: "文字词汇",
                            },
                            {
                                key: "read",
                                displayName: "阅读",
                            },
                        ],
                    },
                },
            ],
        };

        const expected = [
            {
                key: "study",
                displayName: "学习",
                subCategories: [
                    [
                        {
                            key: "newStandardJP",
                            displayName: "新标日",
                        },
                        {
                            key: "other",
                            displayName: "其他",
                        },
                    ],
                ],
            },
            {
                key: "jlpt",
                displayName: "JLPT",
                subCategories: [
                    [
                        {
                            key: "n1",
                            displayName: "N1",
                        },
                        {
                            key: "n2",
                            displayName: "N2",
                        },
                    ],
                    [
                        {
                            key: "words",
                            displayName: "文字词汇",
                        },
                        {
                            key: "read",
                            displayName: "阅读",
                        },
                    ],
                ],
            },
        ];

        const result = transformCategoryRes(resData);
        expect(result).toMatchObject(expected);
    });
});
