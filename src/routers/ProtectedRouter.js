import {useContext} from "react";
import {useAuth} from "../utils/auth";
import {Navigate, Outlet, useLocation} from "react-router-dom";

function ProtectedRouter({ component: Component, redirect = '/login', ...rest }) {
    const { user } = useAuth()
    const location = useLocation()

    if (!user || user.accessToken === '') {
        return <Navigate to={{pathname: redirect, state: {from: location}}} />
    }

    return <Component {...rest} /> || <Outlet />
}

export default ProtectedRouter;