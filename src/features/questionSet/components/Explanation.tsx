import RichTextRenderer from 'jp_to_react'
import { RichText } from '../questionSetTypes'

export default function Explanation({
    explanation,
}: {
    explanation?: RichText
}) {
    if (!explanation) return null
    return <RichTextRenderer data={explanation} />
}
