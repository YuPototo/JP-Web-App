import { useEffect, useRef } from 'react'
import {
    useAudioListenerDispatch,
    useAudioListenerState,
} from './StateProvider'

export default function HiddenAudio() {
    const { audioUrl, isPlaying, jumpToTime, aPoint, bPoint, playbackRate } =
        useAudioListenerState()

    const dispatch = useAudioListenerDispatch()

    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        dispatch({ type: 'IS_LOADING' })
    }, [audioUrl, dispatch])

    // play or pause
    useEffect(() => {
        const audio = audioRef.current
        if (audio === null) {
            return
        }

        if (isPlaying) {
            audio.play()
        } else {
            audio.pause()
        }
    }, [isPlaying])

    // slow or normal speed
    useEffect(() => {
        const audio = audioRef.current
        if (audio === null) {
            return
        }

        audio.playbackRate = playbackRate
    }, [playbackRate])

    // A hack to jump to time
    useEffect(() => {
        const audio = audioRef.current
        if (audio === null) {
            return
        }

        if (jumpToTime === null) return

        audio.currentTime = jumpToTime

        dispatch({ type: 'JUMP_TIME_FINISHED' })
    }, [jumpToTime, dispatch])

    const handleAudioTimeUpdate = () => {
        const audio = audioRef.current
        if (audio === null) {
            console.error('audioRef.current is null')
            return
        }

        const currentTime = audio.currentTime

        dispatch({ type: 'AUDIO_TIME_UPDATE', payload: { currentTime } })

        // check if there is ab points
        const hasAbPoints = aPoint !== null && bPoint !== null
        if (hasAbPoints) {
            if (currentTime > bPoint) {
                audio.currentTime = aPoint
            }
        }
    }

    const handleLoadedMetadata = () => {
        const audio = audioRef.current
        if (audio === null) {
            console.error('audioRef.current is null')
            return
        }

        dispatch({
            type: 'AUDIO_METADATA_LOADED',
            payload: { duration: audio.duration },
        })

        // iOS can't trigger canplay event, therefore I trigger the event
        // manually here
        handleCanPlay()
    }

    const handleLoadError = () => {
        console.error('audio load error')
    }

    const handleCanPlay = async () => {
        const audio = audioRef.current
        if (audio === null) {
            return
        }

        // todo - when can play, play
    }

    return (
        <audio
            className="my-4"
            ref={audioRef}
            src={audioUrl}
            onTimeUpdate={handleAudioTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onError={handleLoadError}
            onCanPlay={() => dispatch({ type: 'LOADED' })}
        />
    )
}
