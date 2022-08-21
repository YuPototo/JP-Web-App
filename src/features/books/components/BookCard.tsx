import type { IBook } from '../booksTypes'

interface Props {
    book: IBook
}

function BookCard({ book }: Props) {
    return (
        <div className="grid h-44  w-80 grid-cols-2 rounded bg-white p-2 hover:shadow-md">
            <div className="h-full rounded">
                <img className="h-full rounded" alt="封面" src={book.cover} />
            </div>
            <div className="relative -ml-3">
                <div className="text-lg">{book.title}</div>
                <div className="text-gray-500">{book.desc}</div>
            </div>
        </div>
    )
}

export default BookCard
