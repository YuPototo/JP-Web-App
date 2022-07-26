import clsx from 'clsx'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { selectChildrenByLevel, categoryPicked } from '../booksSlice'
import { useGetCategoriesQuery } from '../booksService'
import type { ICategory } from '../booksTypes'
import { extractQueyError } from '../../../store/utils/errorHandling'
import Skeleton from '../../../components/ui/Skeleton'

export default function CategoryNav() {
    const { isLoading, error } = useGetCategoriesQuery()

    const topCategories = useAppSelector((state) => state.books.categories)

    return (
        <div className="my-4">
            {isLoading ? (
                <CategorySkeleton />
            ) : (
                <CategoryList categories={topCategories} categoryLevel={0} />
            )}

            {error && (
                <span className="text-red-500">
                    {`获取内容分类出错：${extractQueyError(error)}`}
                </span>
            )}
        </div>
    )
}

interface CategoryListProps {
    categories: ICategory[]
    categoryLevel: number
    selectedCategoryKeys?: string[]
}

function CategoryList({ categories, categoryLevel }: CategoryListProps) {
    const dispatch = useAppDispatch()
    const children = useAppSelector(selectChildrenByLevel(categoryLevel))

    const selectedCategoryKey = useAppSelector(
        (state) => state.books.selectedCategoryKeys?.[categoryLevel],
    )

    const handleClickCategory = (key: string) => {
        dispatch(categoryPicked({ categoryLevel, key }))
    }

    return (
        <>
            <div className="m-2">
                {categories.map((category) => (
                    <span
                        className={clsx(
                            selectedCategoryKey === category.key &&
                                'bg-green-200',
                            'm-2 rounded-3xl border bg-white py-2 px-4 hover:cursor-pointer hover:bg-green-200',
                        )}
                        key={category.key}
                        onClick={() => handleClickCategory(category.key)}
                    >
                        {category.displayValue}
                    </span>
                ))}
            </div>
            <div className="my-4">
                {children && (
                    <CategoryList
                        categories={children}
                        categoryLevel={categoryLevel + 1}
                    />
                )}
            </div>
        </>
    )
}

function CategorySkeleton() {
    return (
        <div className="flex gap-4">
            <Skeleton w="w-16" />
            <Skeleton w="w-16" />
        </div>
    )
}
