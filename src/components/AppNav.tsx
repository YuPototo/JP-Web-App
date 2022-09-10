import { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import { PersonCircle } from 'react-bootstrap-icons'
import WeChatLoginBtn from '../features/user/WeChatLoginBtn'
import { selectIsLogin } from '../features/user/userSlice'
import { routes } from '../routes/routeBuilder'

export default function AppNav(): ReactElement {
    const isLogin = useAppSelector(selectIsLogin)

    return (
        <div className="flex h-12 items-center justify-between px-3">
            <div className="flex pl-2">
                <Brand />
            </div>

            <Link to={routes.shelf()}>我的书架</Link>

            {isLogin ? (
                <div className="flex items-center gap-4">
                    <span className="">
                        <Link to={routes.account()}>
                            <div className="flex items-center gap-1">
                                <PersonCircle className="icon text-gray-500" />
                                <span className="text-gray-600">账号</span>
                            </div>
                        </Link>
                    </span>
                </div>
            ) : (
                <WeChatLoginBtn />
            )}
        </div>
    )
}

function Brand(): ReactElement {
    const iconImage = '/brand-icon.png' // 因为设置了 homepage 为 /app/

    return (
        <Link to={routes.home()} className="flex items-center ">
            <div className="py-2">
                <img className="mr-2 h-10" src={iconImage} alt="brand" />
            </div>
            <span className="text-gray-600">日语轻松考</span>
        </Link>
    )
}
