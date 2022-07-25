import { Toaster } from "react-hot-toast";
import CategoryNav from "./features/books/Category";

function App() {
    return (
        <div>
            <Toaster />

            <h1 className="text-3xl font-bold underline">Hello world!</h1>
            <CategoryNav />
        </div>
    );
}

export default App;
