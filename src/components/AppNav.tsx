import { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import { PersonCircle } from 'react-bootstrap-icons'
import WeChatLoginBtn from '../features/user/components/WeChatLoginBtn'
import { selectIsLogin } from '../features/user/userSlice'
import { routes } from '../routes/routeBuilder'

export default function AppNav(): ReactElement {
    const isLogin = useAppSelector(selectIsLogin)

    return (
        <div className="flex h-12 items-center gap-5 px-5">
            <Brand />

            <Link
                className="hidden p-2 hover:text-green-800 md:ml-20 md:inline"
                to={routes.home()}
            >
                首页
            </Link>
            <Link className="p-2 hover:text-green-800" to={routes.shelf()}>
                书架
            </Link>
            <Link
                className="p-2 hover:text-green-800"
                to={routes.notebookList()}
            >
                笔记本
            </Link>
            <AccountButton isLogin={isLogin} className="ml-auto" />
        </div>
    )
}

function Brand(): ReactElement {
    const iconImage = '/brand-icon.png' // 因为设置了 homepage 为 /app/

    return (
        <Link to={routes.home()} className="flex items-center ">
            <div className="py-2">
                <img className="h-8 md:h-10" src={iconImage} alt="brand" />
            </div>
            <span className="ml-2 hidden text-gray-600 md:inline">
                日语轻松考
            </span>
        </Link>
    )
}

function AccountButton({
    isLogin,
    className,
}: {
    isLogin: boolean
    className?: string
}) {
    return (
        <div className={className}>
            {isLogin ? (
                <div className="flex items-center gap-4">
                    <Link to={routes.account()}>
                        <div className="flex items-center gap-1">
                            <PersonCircle className="icon text-gray-500" />
                            <span className="text-gray-600">账号</span>
                        </div>
                    </Link>
                </div>
            ) : (
                <WeChatLoginBtn />
            )}
        </div>
    )
}
