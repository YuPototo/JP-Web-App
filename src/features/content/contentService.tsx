import { splitApi } from '../../store/query/splitApi'
import { RootState } from '../../store/store'
import { IChapter, ISection } from './contentTypes'

export const contentApi = splitApi.injectEndpoints({
    endpoints: (build) => ({
        getBookContent: build.query<ISection[], string>({
            query: (bookId) => `books/${bookId}/contents`,
            transformResponse: (res: { sections: ISection[] }) => res.sections,
            keepUnusedDataFor: 1,
        }),
    }),
})

export const { useGetBookContentQuery } = contentApi

export const selectContentByBook = (bookId: string) => {
    return contentApi.endpoints.getBookContent.select(bookId)
}

/**
 * 获取下一个 chapter 的信息
 * 这个方法有挺多问题的。不太严谨。这里先不管了。
 *
 * 这里存在一个重要假设：chapter id 只会出现一次，不会出现同一个 chapter id 出现在不同的 section 中的情况。
 */
export enum NextInfoResultType {
    NoContent = 'NoContent', // 没有 content，此时应该再获取一次 content
    SameSection = 'SameSection', // 下一个 chapter 在同一个 sēction 中
    NextSection = 'NextSection', // 下一个 chapter 在下一个 sēction 中
    NoNext = 'NoNext', // 没有下一个 section 了
    Error = 'Error', // 出错了
}

interface NextInfoBaseResult {
    resultType: NextInfoResultType
}

interface ResultNextSection extends NextInfoBaseResult {
    resultType: NextInfoResultType.NextSection
    nextSection: ISection
    nextChapter: IChapter
}
interface ResultNextChapter extends NextInfoBaseResult {
    resultType: NextInfoResultType.SameSection
    nextChapter: IChapter
}

interface ResultError extends NextInfoBaseResult {
    resultType: NextInfoResultType.Error
    errorMsg: string
}

interface ResultNoNext extends NextInfoBaseResult {
    resultType: NextInfoResultType.NoNext
}

interface ResultNoContent extends NextInfoBaseResult {
    resultType: NextInfoResultType.NoContent
}

export type NextInfoResult =
    | ResultNextSection
    | ResultNextChapter
    | ResultError
    | ResultNoNext
    | ResultNoContent

export const selectNextInfo =
    (bookId: string | null, chapterId: string) =>
    (state: RootState): NextInfoResult => {
        // case 1: 没有 bookId
        if (!bookId) {
            return {
                resultType: NextInfoResultType.Error,
                errorMsg: '没有 bookId',
            }
        }

        const content = selectContentByBook(bookId)(state).data
        if (!content) {
            // case 2: 没有 content
            return {
                resultType: NextInfoResultType.NoContent,
            }
        }

        const currentSectionIndex = getCurrentSectionIndex(chapterId, content)

        const currentSection = content[currentSectionIndex]

        if (!currentSection) {
            // case 3: error
            return {
                resultType: NextInfoResultType.Error,
                errorMsg: '通过 chapterId 找不到对应的 section',
            }
        }

        const chapterLength = currentSection.chapters.length

        const chapterIndex = currentSection.chapters.findIndex(
            (chapter) => chapter.id === chapterId
        )

        if (chapterIndex < chapterLength - 1) {
            // case 4: 下一个 chapter 在同一个 sēction 中
            return {
                resultType: NextInfoResultType.SameSection,
                nextChapter: currentSection.chapters[
                    chapterIndex + 1
                ] as IChapter,
            }
        } else {
            const sectionLength = content.length
            if (currentSectionIndex < sectionLength - 1) {
                const nextSection = content[currentSectionIndex + 1] as ISection
                const nextChapter = nextSection.chapters[0]

                if (!nextChapter) {
                    // case Error
                    return {
                        resultType: NextInfoResultType.Error,
                        errorMsg: `${nextSection.id} 内没有 chapter`,
                    }
                }
                // case 5: 下一个 chapter 在下一个 sēction 中
                return {
                    resultType: NextInfoResultType.NextSection,
                    nextSection,
                    nextChapter,
                }
            } else {
                // case 6: 没有下一个 section 了
                return {
                    resultType: NextInfoResultType.NoNext,
                }
            }
        }
    }

export const getCurrentSectionIndex = (
    chapterId: string,
    content: ISection[]
): number => {
    for (let i = 0; i < content.length; i++) {
        const section = content[i] as ISection
        const chapter = section.chapters.find(
            (chapter) => chapter.id === chapterId
        )
        if (chapter) {
            return i
        }
    }
    return -1
}
