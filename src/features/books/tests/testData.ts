import { Book } from '../booksTypes'

/**
 * Test data
 */
export const practiceTypeCategories = [
    {
        key: 'reading',
        displayValue: '阅读',
    },
    {
        key: 'listening',
        displayValue: '听力',
    },
    {
        key: 'words',
        displayValue: '文字词汇',
    },
]

export const jlptChildren = [
    {
        key: 'n1',
        displayValue: 'N1',
        children: practiceTypeCategories,
    },
    {
        key: 'n2',
        displayValue: 'N2',
        children: practiceTypeCategories,
    },
    {
        key: 'n3',
        displayValue: 'N3',
        children: practiceTypeCategories,
    },
    {
        key: 'n45',
        displayValue: 'N4/N5',
        children: practiceTypeCategories,
    },
]

const categoryJLPT = {
    key: 'jlpt',
    displayValue: 'JLPT 能力考',
    children: jlptChildren,
}

export const studyChidlren = [
    {
        key: 'newStandardJP',
        displayValue: '新标日',
        children: [
            {
                key: 'level_1',
                displayValue: '初级',
            },
            {
                key: 'level_2',
                displayValue: '中级',
            },
            {
                key: 'level_3',
                displayValue: '高级',
            },
        ],
    },
    {
        key: 'others',
        displayValue: '其他',
    },
]

const categoryStudy = {
    key: 'study',
    displayValue: '学习',
    children: studyChidlren,
}

export const categories = [categoryJLPT, categoryStudy]

/* books */
export const books: Book[] = [
    {
        title: '新标日 - 初级',
        id: '62dfa04e2391de581a76ecdc',
        category: {
            key: 'study',
            child: {
                key: 'newStandardJP',
                child: {
                    key: 'level_1',
                },
            },
        },
        hidden: false,
        desc: '',
        cover: 'test_cover',
    },
    {
        title: '新标日 - 中级',
        id: '62dfa04e2391de581a76ecdc',
        category: {
            key: 'study',
            child: {
                key: 'newStandardJP',
                child: {
                    key: 'level_2',
                },
            },
        },
        hidden: false,
        desc: '',
        cover: 'test_cover',
    },
    {
        title: 'n1 阅读',
        id: '62e1d10885a923ba6e1acc25',
        category: {
            key: 'jlpt',
            child: {
                key: 'n1',
                child: {
                    key: 'reading',
                },
            },
        },
        hidden: false,
        desc: '',
        cover: 'test_cover',
    },
    {
        title: 'n1 单词',
        id: '62e1d10885a923ba6e1acc25',
        category: {
            key: 'jlpt',
            child: { key: 'n1', child: { key: 'words' } },
        },
        hidden: false,
        desc: '',
        cover: 'test_cover',
    },
    {
        title: 'n2 单词',
        id: '62e1d10885a923ba6e1acc25',
        category: {
            key: 'jlpt',
            child: { key: 'n2', child: { key: 'words' } },
        },
        hidden: false,
        desc: '',
        cover: 'test_cover',
    },
]
