import { AudioListenerAction, AudioListenerState } from './type'

export function audioListenerReducer(
    state: AudioListenerState,
    action: AudioListenerAction,
) {
    switch (action.type) {
        case 'IS_LOADING': {
            state.isLoading = true
            break
        }

        case 'LOADED': {
            state.isLoading = false
            break
        }

        case 'TOGGLE_PLAY': {
            state.isPlaying = !state.isPlaying
            break
        }

        case 'SET_PLAYBACK_RATE': {
            state.playbackRate = action.payload
            break
        }

        case 'AUDIO_METADATA_LOADED': {
            state.duration = action.payload.duration
            break
        }

        case 'AUDIO_TIME_UPDATE': {
            state.currentTime = action.payload.currentTime
            break
        }

        case 'SEEK_TIME': {
            state.jumpToTime = action.payload

            break
        }

        case 'JUMP_TIME_FINISHED': {
            state.jumpToTime = null
            break
        }

        case 'MOVE_TIME_BY': {
            const jumpToTime = state.currentTime + action.payload
            state.jumpToTime = jumpToTime

            break
        }

        case 'SET_A_POINT': {
            state.aPoint = action.payload
            break
        }

        case 'CLEAR_A_POINT': {
            state.aPoint = null
            break
        }

        case 'SET_B_POINT': {
            state.bPoint = action.payload
            break
        }

        case 'CLEAR_B_POINT': {
            state.bPoint = null
            break
        }

        case 'CLEAR_AB_POINT': {
            state.aPoint = null
            state.bPoint = null
            break
        }

        default: {
            // action.type should be exhaustive, as a result,
            // TS will complain that type is never, which is right
            // When there is no error, then we have unhandled action
            // @ts-expect-error
            throw new Error('Unknown action: ' + action.type)
        }
    }
}
