import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../components/ui/Button'
import {
    selectNextInfo,
    NextInfoResult,
    NextInfoResultType,
    booksApi,
} from '../features/books/booksService'
import ResultBall from '../features/practiceChapter/ResultBall'
import { routes } from '../routes/routeBuilder'
import { useAppDispatch, useAppSelector } from '../store/hooks'

export default function ChapterResultPage() {
    const navigate = useNavigate()

    /** tech debt
     * * 不使用 as
     */
    const { chapterId } = useParams() as { chapterId: string }

    const results = useAppSelector((state) => state.practiceChapter.results)
    const bookId = useAppSelector((state) => state.books.currentBookId)

    const nextInfo = useAppSelector(selectNextInfo(bookId, chapterId))

    // 如果没有 bookId，就返回首页
    useEffect(() => {
        if (!bookId) {
            console.log('没有 bookId，返回首页')
            navigate(routes.home())
        }
    }, [bookId, navigate])

    return (
        <div>
            <h1>点击圆圈进入对应题目</h1>

            <div className="mx-10 my-2 flex flex-wrap">
                {results.map((result, index) => (
                    <div
                        key={index}
                        onClick={() =>
                            navigate(
                                routes.practiceReview(result.questionSetId),
                            )
                        }
                    >
                        <ResultBall questionSetResult={result} index={index} />
                    </div>
                ))}
            </div>
            {bookId && <NextInfo nextInfo={nextInfo} bookId={bookId} />}
        </div>
    )
}

function NextInfo({
    nextInfo,
    bookId,
}: {
    nextInfo: NextInfoResult
    bookId: string
}) {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (nextInfo.resultType === NextInfoResultType.NoContent) {
            dispatch(booksApi.endpoints.getBookContent.initiate(bookId))
        }
    }, [nextInfo.resultType, bookId, dispatch])

    const toNextChapter = (chapterId: string) =>
        navigate(`/chapter/${chapterId}/index/0`, { replace: true })

    if (nextInfo.resultType === NextInfoResultType.NoContent) {
        // 不处理，等待 content 获取结果
        console.log('content 不再存在于 store 里')
        return <></>
    }

    const ToBookDetailButton = (
        <Button outline color="gray" onClick={() => navigate(-1)}>
            返回目录
        </Button>
    )

    if (nextInfo.resultType === NextInfoResultType.Error) {
        return (
            <div>
                <div className="mt-4 mb-4">出错了：{nextInfo.errorMsg}</div>
                {ToBookDetailButton}
            </div>
        )
    }

    if (nextInfo.resultType === NextInfoResultType.NoNext) {
        return (
            <div>
                <div className="mt-4 mb-4 text-lg text-green-600">
                    恭喜你，完成了所有练习
                </div>
                {ToBookDetailButton}
            </div>
        )
    }

    if (nextInfo.resultType === NextInfoResultType.SameSection) {
        return (
            <div>
                <div className="mt-4">下一节：{nextInfo.nextChapter.title}</div>
                <div className="mt-4 flex gap-3">
                    {ToBookDetailButton}
                    <Button
                        outline
                        onClick={() => toNextChapter(nextInfo.nextChapter.id)}
                    >
                        继续做题
                    </Button>
                </div>
            </div>
        )
    }

    if (nextInfo.resultType === NextInfoResultType.NextSection) {
        return (
            <div>
                <div className="mt-4">
                    <span className="mr-2">
                        下一节： {nextInfo.nextSection.title}
                    </span>
                    <span> {nextInfo.nextChapter.title}</span>
                </div>
                <div className="mt-4 flex gap-3">
                    {ToBookDetailButton}
                    <Button
                        outline
                        onClick={() => toNextChapter(nextInfo.nextChapter.id)}
                    >
                        继续做题
                    </Button>
                </div>
            </div>
        )
    }

    /** tech debt
     * 如果写下面的代码，TS 会认为这个 component 可能会返回 undefined
     */
    return (
        <div>
            <div>出错了：不应该渲染这个部分</div>
        </div>
    )
}
