import NotebookCreator from '../features/notebook/NotebookCreator'
import NotebookList from '../features/notebook/NotebookList'
import useAuthGuard from '../features/user/useAuthGuard'

export default function NotebookListPage() {
    useAuthGuard()

    return (
        <div>
            <h1>笔记本</h1>
            <NotebookCreator />
            <NotebookList />
        </div>
    )
}
