import { Link } from 'react-router-dom'
import { useGetParamQuery } from '../features/parameter/paramterService'

export function PdfPage() {
    const { data: pdfImage, isSuccess: isImageSuccess } =
        useGetParamQuery('pdfImage')
    const { data: baiduPanURL, isSuccess: isUrlSuccess } =
        useGetParamQuery('baiduPanURL')
    const { data: baiduPanCode, isSuccess: isPasswordSuccess } =
        useGetParamQuery('baiduPanCode')

    return (
        <div className="rounded bg-white py-4 px-6">
            <h1 className="mb-4 text-lg font-bold text-green-600">真题 PDF</h1>
            <div className="mb-8">
                {isImageSuccess && (
                    <img
                        className="w-48 shadow-lg"
                        src={pdfImage as string}
                        alt="真题图片"
                    />
                )}
            </div>

            <div className="my-4">
                <span className="mr-4">网盘地址</span>
                <span>
                    {isUrlSuccess ? (
                        <a
                            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                            href={baiduPanURL as string}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {baiduPanURL as string}
                        </a>
                    ) : (
                        '地址获取失败'
                    )}
                </span>
            </div>
            <div>
                <span className="mr-4">网盘密码</span>
                <span>
                    {isPasswordSuccess
                        ? (baiduPanCode as string)
                        : '密码获取失败'}
                </span>
            </div>

            <div className="mt-8 text-sm">
                如果无法使用，请
                <Link
                    to="/contact"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                    联系开发者
                </Link>
            </div>
        </div>
    )
}
