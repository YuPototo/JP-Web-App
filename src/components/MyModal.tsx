import React from 'react'
import Modal from 'react-modal'

type Props = {
    isOpen: boolean
    onModalClosed: () => void
    children: React.ReactNode
}

const customStyles = {
    content: {
        top: '20%',
        left: '25%',
        right: '25%',
        bottom: 'auto',
        padding: '25px',
    },
}

export default function MyModal({ isOpen, onModalClosed, children }: Props) {
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
