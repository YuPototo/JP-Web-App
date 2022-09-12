import { useMemo } from 'react'
import { INotebook } from './notebookTypes'

/**
 * default notebooks should come first
 */
export function useOrderNotebooks(notebooks: INotebook[]) {
    const reordered = useMemo(() => {
        const defaultNotebook = notebooks.find((el) => el.isDefault)

        if (!defaultNotebook) {
            return notebooks
        }

        const nonDefaultNotebooks = notebooks.filter((el) => !el.isDefault)

        return [defaultNotebook, ...nonDefaultNotebooks]
    }, [notebooks])
    return reordered
}
