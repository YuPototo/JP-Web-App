import { createContext } from 'react'
import { AudioListenerAction, AudioListenerState } from './type'

export const initialState: AudioListenerState = {
    isLoading: false,
    audioUrl: '',
    duration: 0,
    currentTime: 0,
    isPlaying: false,
    aPoint: null,
    bPoint: null,
    playbackRate: 1,
    jumpToTime: null,
}

export const AudioListenerContext =
    createContext<AudioListenerState>(initialState)

//  dispatch context

type AudioListenerDispatch = React.Dispatch<AudioListenerAction>

export const AudioListenerDispatchContext =
    createContext<AudioListenerDispatch>({} as AudioListenerDispatch)
