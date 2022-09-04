import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { routeBuilder } from '../../../routes/routeBuilder'
import { useAppSelector } from '../../../store/hooks'
import { useGetChapterDoneQuery } from '../../chapterDone/chapterDoneService'
import { selectIsLogin } from '../../user/userSlice'
import { useGetBookContentQuery } from '../booksService'
import { selectContentProgress } from '../booksSlice'
import type { IChapter, ISection } from '../booksTypes'

type Props = {
    bookId: string
}

export default function Content({ bookId }: Props) {
    const [activeSectionIndex, setActiveSectionIndex] = useState(0)

    const { data: sections, isLoading } = useGetBookContentQuery(bookId)

    const isLogin = useAppSelector(selectIsLogin)

    const { data: chaptersDone } = useGetChapterDoneQuery(bookId, {
        skip: !isLogin,
    })

    const { openSectionIndex, nextChapterId } = useAppSelector(
        selectContentProgress,
    )

    useEffect(() => {
        setActiveSectionIndex(openSectionIndex)
    }, [openSectionIndex])

    return (
        <div className="mx-auto mt-4 w-2/3">
            {isLoading && <div>加载练习目录...</div>}
            {sections &&
                sections.map((section, index) => (
                    <div className="my-1" key={section.id}>
                        <Section
                            chaptersDone={chaptersDone}
                            nextChapterId={nextChapterId}
                            section={section}
                            showChapter={index === activeSectionIndex}
                            onClickTitle={() => setActiveSectionIndex(index)}
                        />
                    </div>
                ))}
        </div>
    )
}

type SectionProps = {
    section: ISection
    showChapter: boolean
    nextChapterId?: string
    chaptersDone?: string[]
    onClickTitle: () => void
}

function Section({
    section,
    nextChapterId,
    showChapter = false,
    chaptersDone = [],
    onClickTitle,
}: SectionProps) {
    const { title, chapters } = section

    return (
        <div className="mb-3 border-2 border-white">
            <div
                className="cursor-pointer rounded bg-gray-100  py-2 pl-4 hover:bg-green-100"
                onClick={() => onClickTitle()}
            >
                {title}
            </div>
            {showChapter ? (
                <div className="">
                    {chapters.map((chapter) => (
                        <Chapter
                            chapter={chapter}
                            isDone={chaptersDone?.includes(chapter.id)}
                            isNext={chapter.id === nextChapterId}
                            key={chapter.id}
                        />
                    ))}
                </div>
            ) : null}
        </div>
    )
}

type ChapterProps = {
    isNext: boolean
    isDone: boolean
    chapter: IChapter
}

function Chapter({ chapter, isDone, isNext }: ChapterProps) {
    const navigate = useNavigate()

    return (
        <div
            className={clsx(
                'flex cursor-pointer justify-between  p-2 hover:bg-yellow-100',
                [isNext ? 'bg-yellow-100' : 'bg-white'],
            )}
            onClick={() =>
                navigate(routeBuilder.practiceChapter(chapter.id, 0))
            }
        >
            <span className="pl-4">{chapter.title}</span>{' '}
            {isDone && <span>完成</span>}
        </div>
    )
}
