import NotebookCreateWrapper from '../features/notebook/NotebookCreateWrapper'
import NotebookList from '../features/notebook/NotebookList'
import useAuthGuard from '../features/user/useAuthGuard'

export default function NotebookListPage() {
    useAuthGuard()

    return (
        <div>
            <h1>笔记本</h1>
            <NotebookCreateWrapper />
            <NotebookList />
        </div>
    )
}
