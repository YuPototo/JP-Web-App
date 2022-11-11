import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import { logout } from '../features/user/userThunks'
import { routes } from '../routes/routeBuilder'
import { useAppDispatch, useAppSelector } from '../store/hooks'

export default function AccountPage() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const displayId = useAppSelector((state) => state.user.displayId)

    const quizChance = useAppSelector((state) => state.user.quizChance)
    const isMember = useAppSelector((state) => state.user.isMember)
    const memberDays = useAppSelector((state) => state.user.memberDays)

    const handleLogout = async () => {
        await dispatch(logout())
        toast.success('成功登出，即将回到首页')
        setTimeout(() => {
            navigate(routes.home())
        }, 2000)
    }

    return (
        <div className="rounded bg-white p-4">
            <h1 className="mb-4 text-xl text-green-700">账户</h1>

            <div className="mb-6 flex flex-col gap-3">
                <div>id: {displayId}</div>
                {isMember && <div>会员剩余时长：{memberDays}天</div>}
                {isMember || <div>做题机会：{quizChance}</div>}
            </div>

            <Button outline color="gray" onClick={handleLogout}>
                登出
            </Button>
        </div>
    )
}
