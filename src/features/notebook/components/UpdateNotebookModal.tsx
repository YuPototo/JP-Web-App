import React from 'react'
import Spinner from '../../../components/Spinner'
import toast from 'react-hot-toast'
import { INotebook } from '../notebookTypes'
import MyModal from '../../../components/MyModal'
import { useFormik } from 'formik'
import { useUpdateNotebookMutation } from '../notebookService'

type Props = {
    notebook: INotebook
    isOpen: boolean
    onModalClosed: () => void
}

export default function UpdateNotebookModal({
    notebook,
    isOpen,
    onModalClosed,
}: Props) {
    const [renameNotebook, { isLoading }] = useUpdateNotebookMutation()

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
                const title = values.notebookTitle
                const notebookId = notebook.id
                await renameNotebook({ notebookId, title }).unwrap()
                toast.success('笔记本改名成功')
                values.notebookTitle = ''
                onModalClosed()
            } catch (err) {
                // 在 middleware 处理了
            }
        },
    })

    const disabled =
        !formik.values.notebookTitle || !formik.isValid || isLoading

    return (
        <MyModal isOpen={isOpen} onModalClosed={onModalClosed}>
            <div>改名</div>

            <div>原名：{notebook.title}</div>

            <form onSubmit={formik.handleSubmit}>
                <input
                    className="rounded border"
                    id="notebookTitle"
                    name="notebookTitle"
                    type="text"
                    placeholder="请输入新的名称"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.notebookTitle}
                />
                {formik.touched.notebookTitle && formik.errors.notebookTitle ? (
                    <div>{formik.errors.notebookTitle}</div>
                ) : null}

                <div>
                    <button disabled={disabled} type="submit">
                        {isLoading ? <Spinner /> : <span>提交</span>}
                    </button>
                    <button className="m-2" onClick={onModalClosed}>
                        返回
                    </button>
                </div>
            </form>
        </MyModal>
    )
}
