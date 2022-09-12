import React from 'react'
import { useFormik } from 'formik'
import { useCreateNotebookMutation } from '../notebookService'
import Spinner from '../../../components/Spinner'
import toast from 'react-hot-toast'
import MyModal from '../../../components/MyModal'

type Props = {
    isOpen: boolean
    onModalClosed: () => void
}

export default function CreateNotebookModal({ isOpen, onModalClosed }: Props) {
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

    const disabled =
        !formik.values.notebookTitle || formik.isValid === false || isLoading

    return (
        <MyModal isOpen={isOpen} onModalClosed={onModalClosed}>
            <form onSubmit={formik.handleSubmit}>
                <input
                    placeholder="输入笔记本名称"
                    className="rounded border"
                    id="notebookTitle"
                    name="notebookTitle"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.notebookTitle}
                />
                {formik.errors.notebookTitle ? (
                    <div>{formik.errors.notebookTitle}</div>
                ) : null}

                <div>
                    <button disabled={disabled} type="submit">
                        {isLoading ? <Spinner /> : <span>创建</span>}
                    </button>
                    <button className="m-2" onClick={onModalClosed}>
                        返回
                    </button>
                </div>
            </form>
        </MyModal>
    )
}
