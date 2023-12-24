import {BrowserRouter} from "react-router-dom";
import AuthProvider from "../contexts/AuthProvider";
import AppRouter from "./AppRouter";

export const IndexRouter = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppRouter />
            </AuthProvider>
        </BrowserRouter>
    )
}