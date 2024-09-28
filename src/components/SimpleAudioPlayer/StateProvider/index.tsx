import { useImmerReducer } from 'use-immer'
import {
    AudioListenerContext,
    AudioListenerDispatchContext,
    initialState,
} from './context'
import { audioListenerReducer } from './reducer'
import { useContext } from 'react'

type Props = {
    children: React.ReactNode
    audioUrl: string
}

function AudioListenerProvider({ children, audioUrl }: Props) {
    const [state, dispatch] = useImmerReducer(audioListenerReducer, {
        ...initialState,
        audioUrl,
    })

    return (
        <AudioListenerContext.Provider value={state}>
            <AudioListenerDispatchContext.Provider value={dispatch}>
                {children}
            </AudioListenerDispatchContext.Provider>
        </AudioListenerContext.Provider>
    )
}

AudioListenerProvider.displayName = 'AudioListenerProvider'
export default AudioListenerProvider

export function useAudioListenerDispatch() {
    return useContext(AudioListenerDispatchContext)
}

export function useAudioListenerState() {
    return useContext(AudioListenerContext)
}
