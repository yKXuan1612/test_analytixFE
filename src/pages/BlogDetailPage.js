import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import TimeAgo from "javascript-time-ago";
import vi from "javascript-time-ago/locale/vi";
import SuggestBlogs from "../components/SuggestBlogs";
import {getBlogDetail} from "../apis/api";
import {toast} from "react-toastify";
import {toastConfig} from "../config/toastConfig";
import HtmlParse from "../components/HtmlParse";

TimeAgo.addDefaultLocale(vi)

// Create formatter (English).
const timeAgo = new TimeAgo('vi-VN')
function BlogDetailPage(){
    const { id } = useParams();
    const [blog, setBlog] = useState(null)

    useEffect(() => {
        getBlogDetail(id).then((res) => {
            if (!res.success) return toast.error(res.message, toastConfig)
            setBlog(res.data)
        })
    }, [id])

    return (
        <div className="container m-auto text-white h-auto py-5">
            <div className='py-3 border-t border-secondary'>
                <p className="text-3xl font-semibold">{blog?.title}</p>
                <p>{blog?.created_at && timeAgo.format(new Date(blog?.created_at))}</p>
            </div>
            <div className="grid grid-cols-12 gap-4 h-auto">
                <div className='col-span-9 p-5 no-tailwindcss-base'>
                    {
                        blog?.body && <HtmlParse html={blog?.body} />
                    }
                </div>

                <div className='col-span-3 '>
                    <div className='col-span-4 p-4  border border-gray-800 h-auto'>
                        <p className='text-secondary font-bold text-xl border-b border-gray-500'>Nên đọc</p>
                        <div className='col-span-4 gap-5 grid grid-rows-5 py-2'>
                            <SuggestBlogs/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default BlogDetailPage;