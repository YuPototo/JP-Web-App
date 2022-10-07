import React from 'react'
import RichtTextRenderer from 'jp_to_react'

export default function RendererExample() {
    // const baseData = [
    //     {
    //         type: 'paragraph',
    //         children: [
    //             {
    //                 type: 'tip',
    //                 tip: 'ざっし',
    //                 children: [{ text: '雑誌' }],
    //             },
    //             { text: 'を　' },
    //             {
    //                 type: 'tip',
    //                 tip: 'か',
    //                 children: [{ text: '買' }],
    //             },
    //             {
    //                 text: 'いに',
    //             },
    //             {
    //                 type: 'tip',
    //                 tip: 'い',
    //                 children: [{ text: '行' }],
    //             },
    //             {
    //                 text: 'きました。',
    //             },
    //         ],
    //     },
    //     {
    //         type: 'paragraph',
    //         children: [
    //             {
    //                 text: '去买杂志了。',
    //             },
    //         ],
    //     },
    // ]

    const data = [
        {
            type: 'paragraph',
            children: [
                {
                    text: '这是 question set 的 body。这是一个简单的题目。',
                },
            ],
        },
    ]

    return (
        <div>
            <h1>RendererExample</h1>
            <div className="my-4 bg-yellow-50 p-4">
                <RichtTextRenderer data={data} />
            </div>
        </div>
    )
}
