import Spinner from '../../../components/Spinner'
import toast from 'react-hot-toast'
import { INotebook } from '../notebookTypes'
import MyModal from '../../../components/MyModal'
import { Formik, FormikErrors } from 'formik'
import { useUpdateNotebookMutation } from '../notebookService'
import Button from '../../../components/ui/Button'

type Props = {
    notebook: INotebook
    isOpen: boolean
    onModalClosed: () => void
}

interface FormValues {
    notebookTitle: string
}

export default function UpdateNotebookModal({
    notebook,
    isOpen,
    onModalClosed,
}: Props) {
    const [renameNotebook, { isLoading }] = useUpdateNotebookMutation()

    const initialValues: FormValues = {
        notebookTitle: '',
    }

    return (
        <MyModal isOpen={isOpen} onModalClosed={onModalClosed}>
            <div className="mb-4">原名：{notebook.title}</div>

            <Formik
                initialValues={initialValues}
                validate={(values) => {
                    let errors: FormikErrors<FormValues> = {}
                    if (!values.notebookTitle) {
                        errors.notebookTitle = '需要输入笔记本名称'
                    }
                    return errors
                }}
                onSubmit={async (values) => {
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
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <input
                            placeholder="请输入新的名称"
                            className="rounded border py-2 px-3"
                            id="notebookTitle"
                            name="notebookTitle"
                            type="text"
                            autoFocus
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.notebookTitle}
                        />
                        <div className="mt-1 text-sm text-red-500">
                            {errors.notebookTitle &&
                                touched.notebookTitle &&
                                errors.notebookTitle}
                        </div>
                        <div className="mt-4 flex gap-4">
                            <Button outline onClick={onModalClosed}>
                                返回
                            </Button>
                            <Button disabled={isSubmitting} type="submit">
                                {isLoading ? <Spinner /> : <span>提交</span>}
                            </Button>
                        </div>
                    </form>
                )}
            </Formik>
        </MyModal>
    )
}
