import BookCard from '../books/components/BookCard'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../routes/routeBuilder'
import { useWorkingBook } from './hooks/useWorkingBook'

export default function WorkingBook(): JSX.Element {
    const navigate = useNavigate()

    const { book, isDone, sectionTitle, chapterTitle, questionSetIndex } =
        useWorkingBook()

    if (!book) return <></>

    return (
        <div
            className="mb-4 hover:cursor-pointer"
            onClick={() => navigate(routes.bookDetail(book.id))}
        >
            <div>working book</div>
            <BookCard book={book} />

            {isDone ? (
                <div>这本书做完了</div>
            ) : (
                <div>
                    <div>{sectionTitle}</div>
                    <div>{chapterTitle}</div>
                    {questionSetIndex !== undefined && (
                        <div>第{questionSetIndex + 1}题</div>
                    )}
                </div>
            )}
        </div>
    )
}
