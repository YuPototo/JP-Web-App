import BookList from '../features/books/components/BookList'
import CategoryNav from '../features/books/components/Category'
import WorkingBook from '../features/progress/components/WorkingBook'
import { useAppSelector } from '../store/hooks'
import { selectHasSelectedCategory } from '../features/books/booksSlice'

export default function Home() {
    const hideWorkingBook = useAppSelector(selectHasSelectedCategory)

    return (
        <>
            <CategoryNav />
            {hideWorkingBook || <WorkingBook />}
            <BookList />
        </>
    )
}
