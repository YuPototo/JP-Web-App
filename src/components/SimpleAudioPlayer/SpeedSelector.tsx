import { useState } from 'react'
import {
    useAudioListenerDispatch,
    useAudioListenerState,
} from './StateProvider'
import Button from '../ui/Button'

export default function SpeedSelector() {
    const [showSelector, setShowSelector] = useState(false)
    const dispatch = useAudioListenerDispatch()

    const { playbackRate } = useAudioListenerState()

    const handleChangePlaybackRate = (rate: number) => {
        dispatch({
            type: 'SET_PLAYBACK_RATE',
            payload: rate,
        })
        setShowSelector(false)
    }

    return (
        <div className="relative">
            {showSelector && (
                <div className="absolute bottom-0 -ml-32 mb-10 flex gap-3 rounded bg-gray-300 p-3">
                    <Button
                        outline
                        className=""
                        onClick={() => handleChangePlaybackRate(0.7)}
                    >
                        0.7x
                    </Button>
                    <Button
                        outline
                        className=""
                        onClick={() => handleChangePlaybackRate(1)}
                    >
                        1.0x
                    </Button>
                    <Button
                        outline
                        className=""
                        onClick={() => handleChangePlaybackRate(1.3)}
                    >
                        1.3x
                    </Button>
                </div>
            )}
            <Button
                // show play back rate selection
                onClick={() => setShowSelector(!showSelector)}
                outline
            >
                {TransformNumberText(playbackRate)}x
            </Button>
        </div>
    )
}

/**
 * transform 1 to 1.0,
 *  1.5 to 1.5,
 *  0.8 to 0.8
 */
function TransformNumberText(num: number): string {
    if (num === 1) {
        return '1.0'
    }
    return num.toString()
}
