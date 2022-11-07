import { useNavigate } from 'react-router-dom'
import { routes } from '../../../routes/routeBuilder'
import { useWorkingBook } from '../hooks/useWorkingBook'
import BookCardRecent from '../../books/components/BookCardRecent'

export default function WorkingBook(): JSX.Element {
    const navigate = useNavigate()

    const { book } = useWorkingBook()

    if (!book) return <></>

    return (
        <div
            className="mb-4 hover:cursor-pointer"
            onClick={() => navigate(routes.bookDetail(book.id))}
        >
            <BookCardRecent />
        </div>
    )
}
