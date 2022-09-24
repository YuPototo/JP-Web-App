import { useNavigate } from 'react-router-dom'
import useAuthGuard from '../features/user/useAuthGuard'
import { useGetWrongRecordQuery } from '../features/wrongRecord/wrongRecordService'
import { routes } from '../routes/routeBuilder'

export default function WrongNotebookPage() {
    const navigate = useNavigate()
    const login = useAuthGuard()

    const { data, isLoading } = useGetWrongRecordQuery(undefined, {
        skip: !login,
    })

    if (isLoading) {
        return <div>加载中...</div>
    }

    return (
        <div>
            <h1>错题本</h1>
            <div>错题数量：{data?.length}</div>
            <button onClick={() => navigate(routes.practiceWrongRecord())}>
                开始复习
            </button>
        </div>
    )
}
