import RichTextRenderer from 'jp_to_react'

export default function Explanation({ explanation }: { explanation?: string }) {
    if (!explanation) return null
    return <RichTextRenderer data={explanation} />
}
