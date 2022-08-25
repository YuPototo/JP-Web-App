import { RootState } from '../../../store/store'
import bookSliceReducer, {
    selectChildrenByLevel,
    setCategoryKey,
    selectBooksByCategory,
} from '../booksSlice'
import { BooksState } from '../booksTypes'
import {
    categories,
    jlptChildren,
    studyChidlren,
    practiceTypeCategories,
    books,
} from './testData'

describe('reducer: setCategoryKey', () => {
    it('should set 1st level category key', () => {
        const initialState: BooksState = {
            categories,
            selectedCategoryKeys: [],
            books,
            currentBookId: null,
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
        const initialState: BooksState = {
            categories,
            selectedCategoryKeys: ['jlpt'],
            books: [],
            currentBookId: null,
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
        const initialState: BooksState = {
            categories,
            selectedCategoryKeys: ['jlpt', 'n1'],
            books: [],
            currentBookId: null,
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
        const initialState: BooksState = {
            categories,
            selectedCategoryKeys: ['jlpt', 'n1', 'reading'],
            books: [],
            currentBookId: null,
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
        const initialState: BooksState = {
            categories,
            selectedCategoryKeys: ['jlpt', 'n1', 'reading'],
            books: [],
            currentBookId: null,
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
        const initialState: BooksState = {
            categories,
            selectedCategoryKeys: [],
            books: [],
            currentBookId: null,
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
    const initialState: BooksState = {
        categories,
        selectedCategoryKeys: [],
        books: [],
        currentBookId: null,
    }

    it("select ['jlpt']", () => {
        initialState.selectedCategoryKeys = ['jlpt']

        const result = selectChildrenByLevel(0)({
            books: initialState,
        } as RootState)
        expect(result).toEqual(jlptChildren)
    })

    it("select ['study']", () => {
        initialState.selectedCategoryKeys = ['study']

        const result = selectChildrenByLevel(0)({
            books: initialState,
        } as RootState)
        expect(result).toEqual(studyChidlren)
    })

    it("select ['jlpt', 'n1']", () => {
        initialState.selectedCategoryKeys = ['jlpt', 'n1']
        const result = selectChildrenByLevel(1)({
            books: initialState,
        } as RootState)
        expect(result).toEqual(practiceTypeCategories)
    })

    it("select ['study', 'newStandardJP']", () => {
        initialState.selectedCategoryKeys = ['study', 'newStandardJP']
        const result = selectChildrenByLevel(1)({
            books: initialState,
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
    const initialState: BooksState = {
        categories,
        selectedCategoryKeys: [],
        books,
        currentBookId: null,
    }

    it('no selection', () => {
        const result = selectBooksByCategory({
            books: initialState,
        } as RootState)
        expect(result).toEqual(books)
    })

    it('select level 1', () => {
        initialState.selectedCategoryKeys = ['jlpt']
        const result = selectBooksByCategory({
            books: initialState,
        } as RootState)
        const expectedTitleList = ['n1 阅读', 'n1 单词', 'n2 单词']
        expect(result.map((book) => book.title)).toEqual(expectedTitleList)
    })

    it('select level 2', () => {
        initialState.selectedCategoryKeys = ['jlpt', 'n1']
        const result = selectBooksByCategory({
            books: initialState,
        } as RootState)
        const expectedTitleList = ['n1 阅读', 'n1 单词']
        expect(result.map((book) => book.title)).toEqual(expectedTitleList)
    })

    it('select level 3', () => {
        initialState.selectedCategoryKeys = ['jlpt', 'n1', 'reading']
        const result = selectBooksByCategory({
            books: initialState,
        } as RootState)
        const expectedTitleList = ['n1 阅读']
        expect(result.map((book) => book.title)).toEqual(expectedTitleList)
    })
})
