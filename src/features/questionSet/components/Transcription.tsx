export default function Transcription({
    transcription,
}: {
    transcription?: string
}) {
    return (
        <div>
            <div className="mb-2 font-bold text-green-600">听力原文</div>
            {transcription ? (
                <div style={{ whiteSpace: 'pre-wrap' }}>{transcription}</div>
            ) : (
                <div>无听力原文</div>
            )}
        </div>
    )
}
