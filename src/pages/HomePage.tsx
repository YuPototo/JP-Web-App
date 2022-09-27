import BookList from '../features/books/components/BookList'
import CategoryNav from '../features/books/components/Category'
import WorkingBook from '../features/progress/WorkingBook'

//     eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMjg1OTJhNDdhNmZmNTgwOWIzYTdlNCIsImlhdCI6MTY2MzU4ODY1MCwiZXhwIjoxNjcyMjI4NjUwfQ._Qn5K7fisrizt-QkiPmq_WRHWLvScJGIwO4tWUW_f3E

export default function home() {
    return (
        <>
            <CategoryNav />
            <WorkingBook />
            <BookList />
        </>
    )
}
