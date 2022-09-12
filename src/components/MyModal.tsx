import React from 'react'
import Modal from 'react-modal'

type Props = {
    isOpen: boolean
    onModalClosed: () => void
    children: React.ReactNode
    bottom?: string
}

export default function MyModal({
    isOpen,
    onModalClosed,
    children,
    bottom, // 如果设置为 auto，那么 modal 高度会根据内容自动调整。否则固定高度
}: Props) {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onModalClosed}
            shouldCloseOnOverlayClick={true}
            style={customStyles}
        >
            {children}
        </Modal>
    )
}
