import React from 'react'
import { useNavigate } from 'react-router-dom'
import { logoutThunk } from '../features/user/userSlice'
import { routeBuilder } from '../routes/routeBuilder'
import { useAppDispatch, useAppSelector } from '../store/hooks'

export default function AccountPage() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const displayId = useAppSelector((state) => state.user.displayId)

    const handleLogout = async () => {
        await dispatch(logoutThunk())
        // todo：出现一个 toast 提示
        navigate(routeBuilder.home())
    }

    return (
        <div>
            <h1>AccountPage</h1>
            <div>id: {displayId}</div>

            <button onClick={handleLogout}>登出</button>
        </div>
    )
}
