import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(
    error: unknown,
): error is FetchBaseQueryError {
    return typeof error === 'object' && error != null && 'status' in error
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessage(
    error: unknown,
): error is { message: string } {
    return (
        typeof error === 'object' &&
        error != null &&
        'message' in error &&
        typeof (error as any).message === 'string'
    )
}

/**
 * Extract rtk querry error
 */
export function extractQueyError(error: unknown) {
    if (isFetchBaseQueryError(error)) {
        const errMsg =
            'error' in error ? error.error : JSON.stringify(error.data)
        return errMsg
    } else if (isErrorWithMessage(error)) {
        return error.message
    } else {
        return JSON.stringify(error)
    }
}
