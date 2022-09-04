import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { logoutThunk } from '../features/user/userSlice'
import { routeBuilder } from '../routes/routeBuilder'
import { useAppDispatch, useAppSelector } from '../store/hooks'

// todo: 应该有一个 authGuard

export default function AccountPage() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const displayId = useAppSelector((state) => state.user.displayId)

    const handleLogout = async () => {
        await dispatch(logoutThunk())
        toast.success('成功登出，即将回到首页')
        setTimeout(() => {
            navigate(routeBuilder.home())
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
