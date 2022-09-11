import React from 'react'
import Modal from 'react-modal'
import { useFormik } from 'formik'
import { useCreateNotebookMutation } from './notebookService'
import Spinner from '../../components/Spinner'
import toast from 'react-hot-toast'

type Props = {
    isOpen: boolean
    onModalClosed: () => void
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

export default function NotebookCreateModal({ isOpen, onModalClosed }: Props) {
    const [createNotebook, { isLoading }] = useCreateNotebookMutation()

    const formik = useFormik({
        initialValues: {
            notebookTitle: '',
        },
        validate: (values) => {
            const errors: Partial<typeof values> = {}
            if (!values.notebookTitle) {
                errors.notebookTitle = '需要输入笔记本名称'
            }
            return errors
        },
        onSubmit: async (values) => {
            try {
                await createNotebook(values.notebookTitle).unwrap()
                toast.success('笔记本创建成功')
                values.notebookTitle = ''
                onModalClosed()
            } catch (err) {
                // 在 middleware 处理了
            }
        },
    })

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onModalClosed}
            shouldCloseOnOverlayClick={true}
            style={customStyles}
        >
            <form onSubmit={formik.handleSubmit}>
                <input
                    className="rounded border"
                    id="notebookTitle"
                    name="notebookTitle"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.notebookTitle}
                />
                {formik.errors.notebookTitle ? (
                    <div>{formik.errors.notebookTitle}</div>
                ) : null}

                <div>
                    <button
                        disabled={!formik.isValid || isLoading}
                        type="submit"
                    >
                        {isLoading ? <Spinner /> : <span>创建</span>}
                    </button>
                    <button className="m-2" onClick={onModalClosed}>
                        返回
                    </button>
                </div>
            </form>
        </Modal>
    )
}
