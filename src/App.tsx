import { useGetCategoriyesQuery } from "./features/bookList/bookService";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import stringifyRtkQuerryError from "./store/utils/stringifyRtkQuerryError";
import CategoryNav from "./features/bookList/Category";

function App() {
    const { data, isLoading, error } = useGetCategoriyesQuery();

    useEffect(() => {
        if (error) {
            toast.error(stringifyRtkQuerryError(error));
        }
    }, [error]);

    return (
        <div>
            <Toaster />

            <h1 className="text-3xl font-bold underline">Hello world!</h1>
            <CategoryNav />

            {isLoading && <div>Loading...</div>}
            {error && <div>error: {error.toString()}</div>}
            {data && <div>finish fetching categories</div>}
        </div>
    );
}

export default App;
