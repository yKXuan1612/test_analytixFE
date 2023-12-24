import {useContext} from "react";
import AuthContext from "../contexts/AuthContext";
import axios from "axios";
import {TOKEN_API} from "../constants/api";

export const useAuth = () => useContext(AuthContext)

export const getUserData = () => {
    let user;
    // Get user data from local storage
    if (localStorage.getItem('user') !== null) {
        user = JSON.parse(localStorage.getItem('user'))
    }

    if (!user) return null

    // Check if user is logged in
    if (Object.keys(user).length === 0) {
        return null
    }

    // Check if user has access token
    if (user.accessToken === '') {
        return null
    }

    // Check if Storage is supported
    if (typeof Storage === 'undefined') {
        return null
    }

    return user
}

export const setUserData = (user) => {
    if(!user || typeof user !== 'object') {
        return Error('User data must be an object')
    }

    if (Object.keys(user).length === 0) {
        return Error('User is not logged in')
    }

    if (user.accessToken === '') {
        return Error('User is not logged in')
    }

    if (typeof Storage === 'undefined') {
        return Error('Your browser is not supported')
    }

    localStorage.setItem('user', JSON.stringify(user))
}

export const removeUserData = () => {
    if (typeof Storage === 'undefined') {
        return
    }

    localStorage.removeItem('user')
}

export const getAccessToken = () => {
    const user = getUserData()

    if (user) {
        return user.accessToken
    }

    return null
}

export const getRefreshToken = () => {
    const user = getUserData()

    if (user) {
        return user.refreshToken
    }

    return null
}

export const updateAccessToken = (accessToken) => {
    const user = getUserData()

    if (user) {
        user.accessToken = accessToken
        setUserData(user)
    }
}

export const isAuthentificated = () => {
    const user = getUserData()

    if (user && user.accessToken !== '') {
        return true
    }

    return false
}

export const getNewAccessToken = async () => {
    const refreshToken = getRefreshToken()

    if (!refreshToken) {
        return null
    }

    try {
        const response = await axios.post(TOKEN_API + 'refresh/', {
            refresh: refreshToken
        })
        if (response.status !== 200) {
            return null
        }

        updateAccessToken(response.data.access)
        return response.data
    } catch (err) {
        console.log(err)
    }
}