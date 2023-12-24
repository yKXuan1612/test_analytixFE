import {getAccessToken, getUserData, removeUserData, setUserData} from "../utils/auth";
import {useMemo, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import {LOGIN_API} from "../constants/api";
import {toast} from "react-toastify";
import {toastConfig} from "../config/toastConfig";

function AuthProvider({ children }) {
    const localAccessToken = getAccessToken();
    const [user, setUser] = useState(getUserData());
    const navigate = useNavigate();
    const location = useLocation();

    const login = async (username, password) => {
        try{
        const response = await fetch(LOGIN_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        });

        if (!response.ok) {
            const message = `Thông tin đăng nhập không chính xác`;
            toast.error(message, toastConfig);
            return false;
        }

        const data = await response.json();

        if (data.accessToken) {
            setUser(data);
            setUserData(data);
            navigate(location.state?.from ? location.state.from : '/');
        }
        } catch (error) {
            console.log(error);
            return false;
        }
        return true;
    }

    const logout = () => {
        setUser(null);
        removeUserData();
        navigate('/login');
    }

    const value = useMemo(
        () => ({
        // eslint-disable-next-line no-unused-expressions
        token: localAccessToken,
        user: user,
        login: login,
        logout: logout,
        setUser: setUser
    }), [user, localAccessToken])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;