import MyModal from '../../../components/MyModal'

type Props = {
    isOpen: boolean
    onModalClosed: () => void
}

export default function PayWall({ isOpen, onModalClosed }: Props) {
    return (
        <MyModal isOpen={isOpen} onModalClosed={onModalClosed}>
            <div>你没有做题机会了</div>
            <div>剩下的以后在做</div>
        </MyModal>
    )
}
