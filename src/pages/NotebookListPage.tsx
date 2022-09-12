import NotebookCreator from '../features/notebook/components/NotebookCreator'
import NotebookList from '../features/notebook/components/NotebookListInPage'
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
