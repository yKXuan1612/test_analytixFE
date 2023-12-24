import {useEffect, useState} from "react";
import {getSuggestBlogs} from "../apis/api";
import {toast} from "react-toastify";
import {toastConfig} from "../config/toastConfig";
import {MiniBlogCard} from "../pages/BlogPage";

function SuggestBlogs(){
    const [suggestBlog, setSuggestBlog] = useState(null)

    useEffect(() => {
        getSuggestBlogs().then((res) => {
            if (!res.success) return toast.error(res.message, toastConfig)
            setSuggestBlog(res.data)
        })
    }, [])

    return (
        <>
            {
                suggestBlog && suggestBlog.length === 0 &&
                <p className='text-2xl font-semibold text-center col-span-12 text-white'>
                    Không có blog đề xuất
                </p>
            }
            {
                suggestBlog && suggestBlog.map((blog, index) => (
                    <MiniBlogCard key={blog.id} blog={blog} />
                ))
            }
        </>
    )
}

export default SuggestBlogs;