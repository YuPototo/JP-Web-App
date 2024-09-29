import { useState } from 'react'
import { CheckCircle } from 'react-bootstrap-icons'
import MyModal from '../../../components/MyModal'
import Button from '../../../components/ui/Button'
import { IGood, useGetGoodsQuery } from '../../good/goodService'
import { useGetParamQuery } from '../../parameter/paramterService'
import { useAppSelector } from '../../../store/hooks'

type Props = {
    isOpen: boolean
    onModalClosed: () => void
}

export default function PayWall({ isOpen, onModalClosed }: Props) {
    const displayId = useAppSelector((state) => state.user.displayId)

    const [showMemberInfo, setShowMemberInfo] = useState(false)

    const { data: goods } = useGetGoodsQuery()
    const { data: qrCode } = useGetParamQuery('qr_code')

    const oneMonthPrice = getOneMonthPrice(goods)

    return (
        <MyModal isOpen={isOpen} onModalClosed={onModalClosed}>
            <h2 className="mb-4 text-lg text-green-600">成为会员</h2>
            <div className="my-3 ml-2 flex items-center gap-2">
                <CheckCircle className="text-lg text-green-600" />
                <span className="text-gray-800">会员权益：无限做题</span>
            </div>
            <div className="my-3 ml-2 flex items-center gap-2">
                <CheckCircle className="text-lg text-green-600" />
                <span className="text-gray-800">每月仅需{oneMonthPrice}元</span>
            </div>
            <div className="text-sm text-gray-600">
                自2019年起，服务超过10万学习者
            </div>

            {/* Undefined is not legal as Children */}
            {showMemberInfo ? (
                <></>
            ) : (
                <div className="mt-4 ml-4">
                    <Button onClick={() => setShowMemberInfo(true)}>
                        购买会员
                    </Button>
                </div>
            )}

            {showMemberInfo && (
                <>
                    <div className="mt-6 text-lg text-green-600">
                        如何成为会员
                    </div>
                    <div className="mt-2 ml-2">添加开发者微信即可</div>

                    {qrCode && (
                        <div className="flex justify-center ">
                            <img src={qrCode as string} alt="qr-code" />
                        </div>
                    )}

                    <div className="mt-1 flex justify-center gap-2 text-sm text-gray-500">
                        <span>微信号</span>
                        <span>yjjs18599007893</span>
                    </div>

                    <div>添加开发者后，提供您的ID：{displayId}</div>
                </>
            )}
        </MyModal>
    )
}

function getOneMonthPrice(goods?: IGood[]) {
    if (goods && goods.length > 0) {
        const oneMonth = goods.find((good) => good.name === '1月会员')
        if (oneMonth) return oneMonth?.price / 100
    }
    return 7
}
