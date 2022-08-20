// https://redux-toolkit.js.org/api/createListenerMiddleware#typescript-usage

import { createListenerMiddleware } from '@reduxjs/toolkit'

const listenerMiddlewareInstance = createListenerMiddleware({
    onError: () => console.error,
})

export default listenerMiddlewareInstance
