import {createContext} from "react";

const AuthContext = createContext({
    user: {
        email: '',
        firstName: '',
        lastName: '',
        accessToken: '',
        refreshToken: '',
        description: '',
        phoneNumber: '',
    },
    login: () => {},
    logout: () => {},
    setUser: () => {}
});

export default AuthContext;