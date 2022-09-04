import { ISection } from '../booksTypes'
import { getOpenSection } from './getOpenSection'

describe('getOpenSection', () => {
    const sections: ISection[] = [
        {
            id: 'section_1',
            title: 'Section 1',
            chapters: [
                {
                    id: 'chapter_1_1',
                    title: 'Chapter 1.1',
                },
                {
                    id: 'chapter_1_2',
                    title: 'Chapter 1.2',
                },
            ],
        },
        {
            id: 'section_2',
            title: 'Section 2',
            chapters: [
                {
                    id: 'chapter_2_1',
                    title: 'Chapter 2_1',
                },
            ],
        },
    ]

    it('should open first section if no chapter dones', () => {
        expect(getOpenSection(sections, [])).toMatchObject({
            openSectionIndex: 0,
        })
    })

    it('should open first section is first unfinished chapter is in firsrt section', () => {
        expect(getOpenSection(sections, ['chapter_1_1'])).toMatchObject({
            openSectionIndex: 0,
            nextChapterId: 'chapter_1_2',
        })
    })

    it('should open second section is first unfinished chapter is in second section', () => {
        expect(
            getOpenSection(sections, ['chapter_1_1', 'chapter_1_2']),
        ).toMatchObject({
            openSectionIndex: 1,
            nextChapterId: 'chapter_2_1',
        })
    })

    it('should return first section if every chapter is done', () => {
        expect(
            getOpenSection(sections, [
                'chapter_1_1',
                'chapter_1_2',
                'chapter_2_1',
            ]),
        ).toMatchObject({
            openSectionIndex: 0,
        })
    })
})
