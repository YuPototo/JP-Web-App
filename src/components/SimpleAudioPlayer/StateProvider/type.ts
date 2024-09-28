export interface AudioListenerState {
    isLoading: boolean
    audioUrl: string
    duration: number
    currentTime: number

    isPlaying: boolean
    aPoint: number | null
    bPoint: number | null
    playbackRate: number

    jumpToTime: number | null
}

export type AbRepeatAction =
    | {
          type: 'SET_A_POINT'
          payload: number
      }
    | {
          type: 'SET_B_POINT'
          payload: number
      }
    | {
          type: 'CLEAR_A_POINT'
      }
    | {
          type: 'CLEAR_B_POINT'
      }
    | {
          type: 'CLEAR_AB_POINT'
      }

export type AudioListenerAction =
    | {
          type: 'LOADED'
      }
    | {
          type: 'IS_LOADING'
      }
    | {
          type: 'TOGGLE_PLAY'
      }
    | {
          type: 'SET_PLAYBACK_RATE'
          payload: number
      }
    | {
          type: 'AUDIO_METADATA_LOADED'
          payload: { duration: number }
      }
    | {
          type: 'AUDIO_TIME_UPDATE'
          payload: { currentTime: number }
      }
    | {
          type: 'SEEK_TIME'
          payload: number
      }
    | { type: 'JUMP_TIME_FINISHED' }
    | {
          type: 'MOVE_TIME_BY'
          payload: number
      }
    | AbRepeatAction
