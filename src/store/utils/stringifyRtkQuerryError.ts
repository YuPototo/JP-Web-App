import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

/*
 * reference: https://redux-toolkit.js.org/rtk-query/usage-with-typescript#type-safe-error-handling
 *
 * 如果服务器返回 400 错误，且返回的 response 的 body 是 { message: "error message" }, 这个函数会返回 stringify 的 reponse body
 * 这似乎是一个值得优化的点，但如果要优化的话，我需要新增一个条件，似无必要
 */
export default function stringifyRtkQuerryError(
    error: SerializedError | FetchBaseQueryError
): string {
    if ("status" in error) {
        // you can access all properties of `FetchBaseQueryError` here
        const errMsg =
            "error" in error ? error.error : JSON.stringify(error.data);
        return errMsg;
    } else {
        // you can access all properties of `SerializedError` here
        return error.message || JSON.stringify(error);
    }
}
