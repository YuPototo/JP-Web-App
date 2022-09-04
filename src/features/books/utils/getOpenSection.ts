import { ISection } from '../booksTypes'

/**
 * Feature: 展开第1个没有做的 chapter
 */
export function getOpenSection(
    sections: ISection[],
    doneChapters: string[],
): { openSectionIndex: number; nextChapterId?: string } {
    if (doneChapters.length === 0) return { openSectionIndex: 0 }
    for (let i = 0; i < sections.length; i++) {
        const section = sections[i] as ISection
        if (
            section.chapters.some(
                (chapter) => !doneChapters.includes(chapter.id),
            )
        ) {
            const indexOfChapter = section.chapters.findIndex(
                (chapter) => !doneChapters.includes(chapter.id),
            )
            return {
                openSectionIndex: i,
                nextChapterId: section.chapters[indexOfChapter]!.id,
            }
        }
    }
    return { openSectionIndex: 0 }
}
