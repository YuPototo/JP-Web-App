import React from "react";

const books = [
    {
        name: "a",
        categories: [
            {
                key: "jlpt",
                subCategories: [["n1"], ["read", "listen"]],
            },
        ],
    },
    {
        name: "b",
        categories: [
            {
                key: "jlpt",
                subCategories: [["n1", "n2"], ["read"]],
            },
        ],
    },
    {
        name: "c",
        categories: [
            {
                key: "jlpt",
                subCategories: [["n2"], ["read", "words"]],
            },
        ],
    },
];

export default function BookList() {
    return <div>BookList</div>;
}
