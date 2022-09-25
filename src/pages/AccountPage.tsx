import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { logout } from '../features/user/userThunks'
import { routes } from '../routes/routeBuilder'
import { useAppDispatch, useAppSelector } from '../store/hooks'

export default function AccountPage() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const displayId = useAppSelector((state) => state.user.displayId)

    const quizChance = useAppSelector((state) => state.user.quizChance)
    const isMember = useAppSelector((state) => state.user.isMember)

    const handleLogout = async () => {
        await dispatch(logout())
        toast.success('成功登出，即将回到首页')
        setTimeout(() => {
            navigate(routes.home())
        }, 2000)
    }

    return (
        <div>
            <h1>AccountPage</h1>
            <div>id: {displayId}</div>

            <div>会员状态：{isMember ? '是' : '否'}</div>
            <div>做题机会：{quizChance}</div>

            <button onClick={handleLogout}>登出</button>
        </div>
    )
}
