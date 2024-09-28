import AudioListenerProvider from './StateProvider'
import Player from './Player'

type Props = {
    audioUrl: string
}

export default function AudioListener({ audioUrl }: Props) {
    return (
        <AudioListenerProvider audioUrl={audioUrl}>
            <Player />
        </AudioListenerProvider>
    )
}
