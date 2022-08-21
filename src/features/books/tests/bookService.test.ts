import { getCurrentSectionIndex } from '../booksService'
import type { ISection } from '../booksTypes'

describe('getCurrentSectionIndex', () => {
    it('simple case 1', () => {
        const sections: ISection[] = [
            {
                id: 'section_1',
                title: 'Section 1',
                chapters: [
                    {
                        id: 'chapter_1',
                        title: 'Chapter 1',
                    },
                ],
            },
        ]
        expect(getCurrentSectionIndex('chapter_1', sections)).toBe(0)
    })

    it('simple case 2', () => {
        const sections: ISection[] = [
            {
                id: 'section_1',
                title: 'Section 1',
                chapters: [
                    {
                        id: 'chapter_1',
                        title: 'Chapter 1',
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
        expect(getCurrentSectionIndex('chapter_2_1', sections)).toBe(1)
    })

    it('simple case 3', () => {
        const sections: ISection[] = [
            {
                id: 'section_1',
                title: 'Section 1',
                chapters: [
                    {
                        id: 'chapter_1_1',
                        title: 'Chapter 1',
                    },
                    {
                        id: 'chapter_1_2',
                        title: 'Chapter 2',
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
        expect(getCurrentSectionIndex('chapter_1_2', sections)).toBe(0)
    })
})
