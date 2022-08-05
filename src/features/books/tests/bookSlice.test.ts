import { RootState } from '../../../store/store'
import bookSliceReducer, {
    BookListState,
    selectChildrenByLevel,
    setCategoryKey,
    selectBooksByCategory,
} from '../booksSlice'
import {
    categories,
    jlptChildren,
    studyChidlren,
    practiceTypeCategories,
    books,
} from './testData'

describe('reducer: setCategoryKey', () => {
    it('should set 1st level category key', () => {
        const initialState: BookListState = {
            categories,
            selectedCategoryKeys: [],
            books: [],
        }

        expect(
            bookSliceReducer(
                initialState,
                setCategoryKey({ categoryLevel: 0, key: 'jlpt' })
            )
        ).toMatchObject({
            selectedCategoryKeys: ['jlpt'],
        })
    })

    it('should set 2nd level category key', () => {
        const initialState: BookListState = {
            categories,
            selectedCategoryKeys: ['jlpt'],
            books: [],
        }

        expect(
            bookSliceReducer(
                initialState,
                setCategoryKey({ categoryLevel: 1, key: 'n1' })
            )
        ).toMatchObject({
            selectedCategoryKeys: ['jlpt', 'n1'],
        })
    })

    it('should set 3rd level category key', () => {
        const initialState: BookListState = {
            categories,
            selectedCategoryKeys: ['jlpt', 'n1'],
            books: [],
        }

        expect(
            bookSliceReducer(
                initialState,
                setCategoryKey({ categoryLevel: 2, key: 'reading' })
            )
        ).toMatchObject({
            selectedCategoryKeys: ['jlpt', 'n1', 'reading'],
        })
    })

    it('should remove 2nd and 3rd level key if 1st level key is changed', () => {
        const initialState: BookListState = {
            categories,
            selectedCategoryKeys: ['jlpt', 'n1', 'reading'],
            books: [],
        }

        expect(
            bookSliceReducer(
                initialState,
                setCategoryKey({ categoryLevel: 0, key: 'study' })
            )
        ).toMatchObject({
            selectedCategoryKeys: ['study'],
        })
    })

    it('should remove remove 3rd level key if 2nd level key is changed', () => {
        const initialState: BookListState = {
            categories,
            selectedCategoryKeys: ['jlpt', 'n1', 'reading'],
            books: [],
        }

        expect(
            bookSliceReducer(
                initialState,
                setCategoryKey({ categoryLevel: 1, key: 'n2' })
            )
        ).toMatchObject({
            selectedCategoryKeys: ['jlpt', 'n2'],
        })
    })

    it("shouldn't change state when index is larger than selectedCategoryKeys.length", () => {
        const initialState: BookListState = {
            categories,
            selectedCategoryKeys: [],
            books: [],
        }

        expect(
            bookSliceReducer(
                initialState,
                setCategoryKey({ categoryLevel: 1, key: 'n1' })
            )
        ).toEqual(initialState)
    })
})

describe('selectChildrenByLevel', () => {
    const initialState: BookListState = {
        categories,
        selectedCategoryKeys: [],
        books: [],
    }

    it("select ['jlpt']", () => {
        initialState.selectedCategoryKeys = ['jlpt']

        const result = selectChildrenByLevel(0)({
            bookList: initialState,
        } as RootState)
        expect(result).toEqual(jlptChildren)
    })

    it("select ['study']", () => {
        initialState.selectedCategoryKeys = ['study']

        const result = selectChildrenByLevel(0)({
            bookList: initialState,
        } as RootState)
        expect(result).toEqual(studyChidlren)
    })

    it("select ['jlpt', 'n1']", () => {
        initialState.selectedCategoryKeys = ['jlpt', 'n1']
        const result = selectChildrenByLevel(1)({
            bookList: initialState,
        } as RootState)
        expect(result).toEqual(practiceTypeCategories)
    })

    it("select ['study', 'newStandardJP']", () => {
        initialState.selectedCategoryKeys = ['study', 'newStandardJP']
        const result = selectChildrenByLevel(1)({
            bookList: initialState,
        } as RootState)
        expect(result).toEqual([
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
        ])
    })
})

describe('selectBooksByCategory', () => {
    const initialState: BookListState = {
        categories,
        selectedCategoryKeys: [],
        books,
    }

    it('no selection', () => {
        const result = selectBooksByCategory({
            bookList: initialState,
        } as RootState)
        expect(result).toEqual(books)
    })

    it('select level 1', () => {
        initialState.selectedCategoryKeys = ['jlpt']
        const result = selectBooksByCategory({
            bookList: initialState,
        } as RootState)
        const expectedResult = [
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
        expect(result).toEqual(expectedResult)
    })

    it('select level 2', () => {
        initialState.selectedCategoryKeys = ['jlpt', 'n1']
        const result = selectBooksByCategory({
            bookList: initialState,
        } as RootState)
        const expectedResult = [
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
        ]
        expect(result).toEqual(expectedResult)
    })

    it('select level 3', () => {
        initialState.selectedCategoryKeys = ['jlpt', 'n1', 'reading']
        const result = selectBooksByCategory({
            bookList: initialState,
        } as RootState)
        const expectedResult = [
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
        ]
        expect(result).toEqual(expectedResult)
    })
})
