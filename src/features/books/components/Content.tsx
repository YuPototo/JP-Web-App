import clsx from 'clsx'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { routeBuilder } from '../../../routes/routeBuilder'
import { useGetBookContentQuery } from '../booksService'
import type { IChapter, ISection } from '../booksTypes'

type Props = {
    bookId: string
}

export default function Content({ bookId }: Props) {
    const [activeSectionIndex, setActiveSectionIndex] = useState(0)
    const { data: sections, isLoading } = useGetBookContentQuery(bookId)

    return (
        <div className="mx-auto mt-4 w-2/3">
            {isLoading && <div>加载练习目录...</div>}
            {sections &&
                sections.map((section, index) => (
                    <div className="my-1" key={section.id}>
                        <Section
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
    onClickTitle: () => void
}

function Section({ section, showChapter = false, onClickTitle }: SectionProps) {
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
                        <div key={chapter.id}>
                            <Chapter chapter={chapter} />
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    )
}

type ChapterProps = {
    chapter: IChapter
}

function Chapter({ chapter }: ChapterProps) {
    const navigate = useNavigate()
    return (
        <div
            className={clsx(
                'flex cursor-pointer justify-between bg-white p-2 hover:bg-yellow-100',
            )}
            onClick={() =>
                navigate(routeBuilder.practiceChapter(chapter.id, 0))
            }
        >
            <span className="pl-4">{chapter.title}</span>
        </div>
    )
}
