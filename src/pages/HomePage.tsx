import BookList from '../features/books/components/BookList'
import CategoryNav from '../features/books/components/Category'
import WorkingBook from '../features/progress/components/WorkingBook'
import { useAppSelector } from '../store/hooks'
import { selectHasSelectedCategory } from '../features/books/booksSlice'

/**
 * eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYmNkMjg2NDdlNDJhMDNkMDk2YjAxYSIsImlhdCI6MTY2NzMxMjU2MywiZXhwIjoxNjc1OTUyNTYzfQ._P9Tdolp8JhOFcWfCJTOjGVhJOj8j-ysrf6agkC0pRw
 */

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
