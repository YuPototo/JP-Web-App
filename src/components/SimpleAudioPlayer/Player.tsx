import { FC } from 'react'
import formatTime from '../../lib/formatTime'
import { Pause, Play } from 'lucide-react'
import {
    useAudioListenerDispatch,
    useAudioListenerState,
} from './StateProvider'
import HiddenAudio from './HiddenAudio'
import SpeedSelector from './SpeedSelector'
import Button from '../ui/Button'

const SimpleAudioPlayer: FC = () => {
    const { isPlaying, currentTime, duration, aPoint, bPoint, isLoading } =
        useAudioListenerState()

    const dispatch = useAudioListenerDispatch()

    const abStatus = getAbStatus(aPoint, bPoint)

    const handleClickA = () => {
        if (abStatus === 'NoAB') {
            dispatch({
                type: 'SET_A_POINT',
                payload: currentTime,
            })
        } else if (abStatus === 'A') {
            dispatch({
                type: 'CLEAR_A_POINT',
            })
        } else {
            dispatch({
                type: 'CLEAR_AB_POINT',
            })
        }
    }

    const handleClickButtonB = () => {
        if (abStatus === 'A') {
            dispatch({
                type: 'SET_B_POINT',
                payload: currentTime,
            })
        } else {
            dispatch({
                type: 'CLEAR_B_POINT',
            })
        }
    }

    return (
        <div className="flex flex-grow flex-col rounded">
            <HiddenAudio />

            {isLoading && <div>音频加载中...</div>}

            {!isLoading && (
                <>
                    <div className="my-5 flex items-center gap-2">
                        <input
                            type="range"
                            className="flex-grow"
                            min={0}
                            max={duration}
                            step={0.1}
                            value={currentTime}
                            onChange={(e) => {
                                dispatch({
                                    type: 'SEEK_TIME',
                                    payload: Number(e.target.value),
                                })
                            }}
                        />
                        <div className="flex justify-center gap-2">
                            <span>{formatTime(currentTime)}</span> /
                            <span>{formatTime(duration)}</span>
                        </div>
                        <SpeedSelector />
                    </div>

                    <div className="mt-4 flex items-center justify-around">
                        <Button
                            outline
                            color="gray"
                            className=""
                            onClick={() =>
                                dispatch({ type: 'MOVE_TIME_BY', payload: -5 })
                            }
                        >
                            -5
                        </Button>

                        <Button
                            outline
                            color="gray"
                            className=""
                            onClick={() =>
                                dispatch({ type: 'MOVE_TIME_BY', payload: 5 })
                            }
                        >
                            +5
                        </Button>
                        <Button
                            outline
                            className=""
                            onClick={() => dispatch({ type: 'TOGGLE_PLAY' })}
                        >
                            {isPlaying ? (
                                <Pause size="32" />
                            ) : (
                                //  add ml-1 to make play icon visually centered
                                <Play className="ml-1" size="32" />
                            )}
                        </Button>
                        <Button
                            outline
                            color="gray"
                            className="btn btn-outline btn-accent btn-lg"
                            onClick={handleClickA}
                        >
                            {getButtonAText(abStatus)}
                        </Button>
                        <Button
                            color="gray"
                            outline
                            className="btn btn-outline btn-accent btn-lg"
                            onClick={handleClickButtonB}
                            disabled={abStatus === 'NoAB'}
                        >
                            {bPoint === null ? 'B' : '- B'}
                        </Button>
                    </div>
                    <div className="mt-8 flex justify-around">
                        {aPoint && <div>A: {formatTime(aPoint)}</div>}
                        {bPoint && <div>B: {formatTime(bPoint)}</div>}
                    </div>
                </>
            )}
        </div>
    )
}

export default SimpleAudioPlayer

function getAbStatus(
    aPoint: number | null,
    bPoint: number | null,
): 'NoAB' | 'A' | 'AB' {
    if (aPoint === null && bPoint === null) {
        return 'NoAB'
    } else if (aPoint !== null && bPoint === null) {
        return 'A'
    } else if (aPoint !== null && bPoint !== null) {
        return 'AB'
    }
    throw new Error('unreachable')
}

function getButtonAText(abStatus: 'NoAB' | 'A' | 'AB'): 'A' | '- A' | '- AB' {
    if (abStatus === 'NoAB') {
        return 'A'
    } else if (abStatus === 'A') {
        return '- A'
    } else {
        return '- AB'
    }
}
