import type { AppThunk } from '../../store/store'
import { chapterApi, selectChapterQuetionSetIds } from './chapterSerivce'
import { finishChapter } from '../chapterDone/chapterDoneThunks'
import { Result, selectChapterId, resultChanged } from './practiceChapterSlice'
import { sendWrongRecord } from '../wrongRecord/wrongRecordService'
import { setProgress } from '../progress/progressThunks'
import { selectIsLogin } from '../user/userSlice'
import { reduceTouristChance } from '../user/userThunks'

/**
 * 获取某个 chapter 的 questionSetIds
 */
export const getQuestionSetIds =
    (chapterId: string): AppThunk<Promise<string[]>> =>
    async (dispatch, getState) => {
        const state = getState()

        let questionSetIds =
            selectChapterQuetionSetIds(chapterId)(state).data?.questionSets

        if (!questionSetIds) {
            // 需要在下面这行使用 await，不然 query 会处于 pending 状态
            await dispatch(chapterApi.endpoints.getChapter.initiate(chapterId))
            const newState = getState()
            questionSetIds =
                selectChapterQuetionSetIds(chapterId)(newState).data
                    ?.questionSets

            if (!questionSetIds) {
                throw Error('doneInChapter: 无法重新获取 questionSetIds')
            }
        }
        return questionSetIds
    }

/*
 * 做完了 chapter 里的题目
 */
export const finishChapterQuestionSet =
    ({
        questionSetId,
        isRight,
    }: {
        questionSetId: string
        isRight: boolean
    }): AppThunk =>
    async (dispatch, getState) => {
        const result = isRight ? Result.Right : Result.Wrong

        // 获取当前 questionSet 的 index
        // 一个方法是：获取 api query 里的 questionSet Array，然后获取其 index
        const state = getState()
        const chapterId = selectChapterId(state)
        if (!chapterId) {
            console.error('chapterId is null')
            return
        }

        let questionSetIds
        try {
            questionSetIds = await dispatch(getQuestionSetIds(chapterId))
        } catch (err) {
            console.error(err)
            return
        }

        // 记录这道题的做题正误情况
        const questionSetIndex = questionSetIds.indexOf(questionSetId)
        dispatch(resultChanged({ questionSetIndex, questionSetId, result }))

        // 记录做题进度
        dispatch(setProgress())

        const isLogin = selectIsLogin(state)

        if (isLogin) {
            // 如果做错了，就发送错误记录
            isRight || dispatch(sendWrongRecord(questionSetId))

            // 如果是最后一个 questionSet，就发送 chapterDone 的请求
            if (questionSetIndex === questionSetIds.length - 1) {
                dispatch(finishChapter(chapterId))
            }
        } else {
            // 游客：减少游客做题次数
            dispatch(reduceTouristChance())
        }
    }
