import { useNavigate, useParams } from 'react-router-dom'
import QuestionSet from '../features/questionSet/components/QuestionSet'
import { useGetChapterQuery } from '../features/practiceChapter/chapterSerivce'
import QuestionSetSkeleton from '../features/questionSet/components/QuestionSetSkeleton'
import { useAppDispatch } from '../store/hooks'
import { useEffect } from 'react'
import {
    initResults,
    chapterUsed,
    questionSetIndexChanged,
} from '../features/practiceChapter/practiceChapterSlice'
import { PracticeMode } from '../features/questionSet/questionSetTypes'
import { routes } from '../routes/routeBuilder'
import QuestionSetListOperator from '../components/QuestionSetListOperator'
import { useGetQuestionSetLoadingInfo } from '../features/questionSet/hooks/useGetQuestionSetLoadingInfo'
import { useTouristChanceGuard } from '../features/user/hooks/useTouristChanceGuard'

export default function PracticeChapterPage() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useTouristChanceGuard()

    // init page
    const { chapterId, questionSetIndex } = useInitChapterPractice()

    // get question set ids
    const {
        data: chapterInfo,
        isLoading: isLoadingChapterInfo,
        isError: isGettingChapterInfoError,
        isSuccess: isGettingChapterInfoSuccess,
        error,
    } = useGetChapterQuery(chapterId)
    const questionSets = chapterInfo?.questionSets || []

    // init queston set results for review feature
    useEffect(() => {
        if (isGettingChapterInfoSuccess) {
            dispatch(initResults(questionSets.length))
        }
    }, [dispatch, chapterId, isGettingChapterInfoSuccess, questionSets.length])

    const questionSetId = questionSets[questionSetIndex]

    // get question set loading info
    const { isLoadingQuestionSet, isFetchingQuestionSet } =
        useGetQuestionSetLoadingInfo(questionSetId)

    // 页面状态1：正在加载章节信息
    if (isLoadingChapterInfo) {
        return (
            <>
                <ChapterInfoSkeleton />
                <QuestionSetSkeleton />
            </>
        )
    }

    // 页面状态2：加载 chapter 信息失败
    if (isGettingChapterInfoError) {
        return <div>获取 chapter 信息出错：{JSON.stringify(error)}</div>
    }

    // 页面状态3：无法从 chapter.questionSetIds 里获取 index 对应的 questionSetId
    if (questionSetId === undefined) {
        return (
            <div>
                出错了：chapter.questionSetIds 里找不到第 {questionSetIndex} 个
                element
            </div>
        )
    }

    const showChapterInfo = chapterInfo !== undefined && questionSetIndex === 0
    const showBtnArea = isGettingChapterInfoSuccess && !isLoadingQuestionSet
    const showQuestionSet =
        isGettingChapterInfoSuccess && questionSetId !== undefined

    const navigateQuestionSet = (delta: 1 | -1) => {
        navigate(routes.practiceChapter(chapterId, questionSetIndex + delta), {
            replace: true,
        })
    }

    // 页面状态4：展示可能存在的题目
    return (
        <div>
            {showChapterInfo && (
                <ChapterInfo
                    title={chapterInfo.title}
                    desc={chapterInfo.desc}
                />
            )}

            {showQuestionSet && (
                <QuestionSet
                    questionSetId={questionSetId}
                    practiceMode={PracticeMode.Chapter}
                />
            )}

            {showBtnArea && (
                <QuestionSetListOperator
                    index={questionSetIndex}
                    questionSetCount={questionSets.length}
                    disabled={isFetchingQuestionSet}
                    onToLast={() => navigateQuestionSet(-1)}
                    onToNext={() => navigateQuestionSet(1)}
                    onFinish={() =>
                        navigate(routes.chapterResult(chapterId), {
                            replace: true,
                        })
                    }
                />
            )}
        </div>
    )
}

function ChapterInfoSkeleton() {
    return (
        <div>
            <div className="skeleton my-2 h-6 w-12"></div>
            <div className="skeleton my-2 h-6 w-12"></div>
        </div>
    )
}

function ChapterInfo({ title, desc }: { title: string; desc?: string }) {
    return (
        <div>
            <div>{title}</div>
            {desc && <div>{desc}</div>}
        </div>
    )
}

/**
 * Init chapter pracitce
 */
function useInitChapterPractice() {
    const dispatch = useAppDispatch()
    const { chapterId, questionSetIndex } = useParams() as {
        chapterId: string
        questionSetIndex: string
    }

    useEffect(() => {
        dispatch(chapterUsed(chapterId))
    }, [chapterId, dispatch])

    useEffect(() => {
        dispatch(questionSetIndexChanged(parseInt(questionSetIndex)))
    }, [dispatch, questionSetIndex])

    return {
        chapterId: chapterId,
        questionSetIndex: parseInt(questionSetIndex),
    }
}
