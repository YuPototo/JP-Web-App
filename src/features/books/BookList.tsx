import React from "react";
import { useAppSelector } from "../../store/hooks";
import { useGetBooksQuery } from "./booksService";
import { selectBooksByCategory } from "./booksSlice";

export default function BookList() {
    useGetBooksQuery();
    const books = useAppSelector(selectBooksByCategory);

    return (
        <div>
            <h1>book list</h1>
            {books.length > 0 ? (
                books.map((book, index) => (
                    <div className="m-4" key={index}>
                        {book.title}
                    </div>
                ))
            ) : (
                <div>No books</div>
            )}
        </div>
    );
}
