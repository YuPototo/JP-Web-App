import { Formik, FormikErrors } from 'formik'
import { useCreateNotebookMutation } from '../notebookService'
import Spinner from '../../../components/Spinner'
import toast from 'react-hot-toast'
import MyModal from '../../../components/MyModal'
import Button from '../../../components/ui/Button'

type Props = {
    isOpen: boolean
    onModalClosed: () => void
}

interface FormValues {
    notebookTitle: string
}

export default function CreateNotebookModal({ isOpen, onModalClosed }: Props) {
    const [createNotebook, { isLoading }] = useCreateNotebookMutation()

    const initialValues: FormValues = {
        notebookTitle: '',
    }

    return (
        <MyModal isOpen={isOpen} onModalClosed={onModalClosed}>
            <h1 className="mb-4 text-lg">创建笔记本</h1>
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
                        await createNotebook(values.notebookTitle).unwrap()
                        toast.success('笔记本创建成功')
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
                            placeholder="输入笔记本名称"
                            className="rounded border py-2 px-3"
                            id="notebookTitle"
                            name="notebookTitle"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.notebookTitle}
                        />
                        <div className="text-sm text-red-500">
                            {errors.notebookTitle &&
                                touched.notebookTitle &&
                                errors.notebookTitle}
                        </div>
                        <div className="mt-4 flex gap-4">
                            <Button
                                outline
                                color="gray"
                                onClick={onModalClosed}
                            >
                                返回
                            </Button>
                            <Button disabled={isSubmitting} type="submit">
                                {isLoading ? <Spinner /> : <span>创建</span>}
                            </Button>
                        </div>
                    </form>
                )}
            </Formik>
        </MyModal>
    )
}
