import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { logout } from '../features/user/userThunks'
import { routes } from '../routes/routeBuilder'
import { useAppDispatch, useAppSelector } from '../store/hooks'

// todo: 应该有一个 authGuard

export default function AccountPage() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const displayId = useAppSelector((state) => state.user.displayId)

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

            <button onClick={handleLogout}>登出</button>
        </div>
    )
}
