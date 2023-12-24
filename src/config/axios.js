import axios from "axios";
import {BASE_URL, TOKEN_API} from "../constants/api";
import {getAccessToken, getNewAccessToken, getRefreshToken, updateAccessToken} from "../utils/auth";

export default axios.create({
    baseURL: BASE_URL
});

export const axiosAuth = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

axiosAuth.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        console.log(token);
        console.log("Trước khi gửi request");
        if (token) {
            config.headers["Authorization"] = "Bearer " + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosAuth.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        console.log("Sau khi gửi request");
        const originalRequest = error.config;
        if (error.response.status === 401) {
            try {
                const token = await getNewAccessToken()
                console.log(token.access);
                originalRequest.headers["Authorization"] = `Bearer ${token.access}`
                updateAccessToken(token.access);
                return axiosAuth(originalRequest);
            } catch (err) {
                console.log(err);
            }
        }
        console.log(error);
        return Promise.reject(error);
    }
);