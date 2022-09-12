import { useState } from 'react'
import { Star, StarFill } from 'react-bootstrap-icons'
import toast from 'react-hot-toast'
import Spinner from '../../../components/Spinner'
import { useAppDispatch } from '../../../store/hooks'
import { updateQuestionSetFav } from '../../questionSet/questionSetService'
import { useDeleteQuestionSetMutation } from '../notebookService'
import NotebookModal from './PickNotebookModal'

interface Props {
    questionSetId: string
    isFav?: boolean
}
export default function FavButton({ questionSetId, isFav }: Props) {
    const [showModal, setShowModal] = useState(false)
    const dispatch = useAppDispatch()

    const [unsaveQuestionSet, { isLoading }] = useDeleteQuestionSetMutation()
    const handleUnsaveQuestionSet = async () => {
        try {
            await unsaveQuestionSet(questionSetId).unwrap()
            toast.success('取消收藏成功')
            dispatch(updateQuestionSetFav(questionSetId, false))
        } catch (err) {
            toast.error('取消收藏失败')
        }
    }

    return (
        <>
            <NotebookModal
                isOpen={showModal}
                onModalClosed={() => setShowModal(false)}
                questionSetId={questionSetId}
            />
            {isFav ? (
                <div onClick={handleUnsaveQuestionSet}>
                    {isLoading ? <Spinner /> : <StarFill size={30} />}
                </div>
            ) : (
                <div
                    className="w-min cursor-pointer p-2 text-yellow-900 "
                    onClick={() => setShowModal(true)}
                >
                    <Star size={30} />
                </div>
            )}
        </>
    )
}
