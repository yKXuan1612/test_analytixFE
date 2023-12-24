import axios, {axiosAuth} from "../config/axios";
import {
    BLOG_API,
    CHECKOUT_API,
    CONSULTATION,
    COURSE_API,
    COURSE_CATEGORY_API, DOCUMENT_API, DOCUMENT_CATEGORY_API,
    MY_COURSE_API, NEWEST_BLOCK_API, NEWEST_BLOG_API, OUTSTANDING_BLOG_API, REGISTER_API, TEACHER_API,
    UPDATE_USER_API
} from "../constants/api";

export const getCourses = async (pageNumber = 1, category = null) => {
    if (!pageNumber || pageNumber < 1) pageNumber = 1
    if (!category || category === 'all') category = null
    const response = await axios.get(COURSE_API + `?page=${pageNumber}` + (category ? `&category=${category}` : ''))
    return response.data
}

export const getMyCourses = async (pageNumber = 1) => {
    if (!pageNumber || pageNumber < 1) pageNumber = 1
    const response = await axiosAuth.get(MY_COURSE_API + `?page=${pageNumber}`)
    console.log("Gửi request");
    return response.data
}

export const getCourseCategory = async (id) => {
    const response = await axios.get(COURSE_CATEGORY_API)
    return response.data
}

export const createConsultationForm = async (data) => {
    const response = await axios.post(CONSULTATION, data)
    return response.data
}

export const getCourseDetail = async (slug) => {
    const response = await axios.get(COURSE_API + `${slug}`)
    return response.data
}

export const updateProfile = async (data) => {
    const response = await axiosAuth.post(UPDATE_USER_API, data)
    return response.data
}

export const checkout = async (data) => {
    const response = await axiosAuth.post(CHECKOUT_API, data)
    return response.data
}

export const getTeacher = async (pageNumber = 1) => {
    const response = await axios.get(TEACHER_API + `?page=${pageNumber}`)
    return response.data
}

export const getDocument = async (pageNumber = 1, category = null) => {
    if (!pageNumber || pageNumber < 1) pageNumber = 1
    if (!category || category === 'all') category = null
    const response = await axios.get(DOCUMENT_API + `?page=${pageNumber}` + (category ? `&category=${category}` : ''))
    return response.data
}


export const getDocumentCategory = async (id) => {
    const response = await axios.get(DOCUMENT_CATEGORY_API)
    return response.data
}

export const getDocumentDetail = async (slug) => {
    const response = await axios.get(DOCUMENT_API + `${slug}`)
    return response.data
}

export const getNewestBlogs = async () => {
    const response = await axios.get(NEWEST_BLOG_API)
    return response.data
}

export const getOutstandingBlogs = async () => {
    const response = await axios.get(OUTSTANDING_BLOG_API)
    return response.data
}

export const getBlogs = async (pageNumber = 1) => {
    if (!pageNumber || pageNumber < 1) pageNumber = 1
    const response = await axios.get(BLOG_API + `?page=${pageNumber}`)
    return response.data
}

export const getSuggestBlogs = async () => {
    const response = await axios.get(BLOG_API + `suggest/`)
    return response.data
}

export const getBlogDetail = async (slug) => {
    const response = await axios.get(BLOG_API + `${slug}`)
    return response.data
}

export const getBannerBlock = async () => {
    const response = await axios.get(BLOG_API + `banner/`)
    return response.data
}
export const register = async (data) => {
    const response = await axios.post(REGISTER_API, data)
    return response.data
}