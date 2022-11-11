import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import useAuthGuard from '../features/user/hooks/useAuthGuard'
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
            <h1 className="mb-4 text-xl text-green-700">错题本</h1>
            <div className="mb-4 text-sm text-gray-700">
                <div className="mb-2">错题会在7天后被移除</div>
                <div>错题会在回答正确后被移除</div>
            </div>
            <div>错题数量：{data?.length}</div>

            <div className="mt-4">
                <Button onClick={() => navigate(routes.practiceWrongRecord())}>
                    开始复习
                </Button>
            </div>
        </div>
    )
}
