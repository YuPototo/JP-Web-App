import RichTextRenderer from 'jp_to_react'
import { RichText } from '../questionSetTypes'

export default function Body({ body }: { body?: RichText }) {
    if (!body) return null
    return <RichTextRenderer data={body} />
}
