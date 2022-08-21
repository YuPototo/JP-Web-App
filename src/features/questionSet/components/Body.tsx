import RichTextRenderer from 'jp_to_react'

export default function Body({ body }: { body?: string }) {
    if (!body) return null
    return <RichTextRenderer data={body} />
}
