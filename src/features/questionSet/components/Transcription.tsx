export default function Transcription({
    transcription,
}: {
    transcription?: string
}) {
    if (!transcription) return <></>
    return <div>{transcription}</div>
}
