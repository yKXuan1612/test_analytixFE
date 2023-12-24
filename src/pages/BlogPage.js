import { IoArrowForward } from "react-icons/io5";
import {useEffect, useState} from "react";
import {getBannerBlock, getBlogs, getNewestBlogs, getOutstandingBlogs, getSuggestBlogs} from "../apis/api";
import {toast} from "react-toastify";
import {toastConfig} from "../config/toastConfig";
import Loading from "../components/Loading";
import {PATH} from "../constants/paths";
import TimeAgo from 'javascript-time-ago'
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import '../App.css'
// English.
import vi from 'javascript-time-ago/locale/vi'
import {Link} from "react-router-dom";
import SuggestBlogs from "../components/SuggestBlogs";

TimeAgo.addDefaultLocale(vi)

// Create formatter (English).
const timeAgo = new TimeAgo('vi-VN')

function BlogPage () {
    const [newestBlog, setNewestBlog] = useState(null)
    const [outstandingBlog, setOutstandingBlog] = useState(null)
    const [blog, setBlog] = useState(null)
    const [bannerBlog, setBannerBlog] = useState(false)

    useEffect(
        () => {
            setNewestBlog(null)
            getNewestBlogs().then((res) => {
                if (!res.success) return toast.error(res.message, toastConfig)
                setNewestBlog(res.data)
            })

            setOutstandingBlog(null)
            getOutstandingBlogs().then((res) => {
                if (!res.success) return toast.error(res.message, toastConfig)
                setOutstandingBlog(res.data)
            })

            setBlog(null)
            getBlogs().then((res) => {
                if (!res.success) return toast.error(res.message, toastConfig)
                setBlog(res.data)
            })

            getBannerBlock().then((res) => {
                if (!res.success) return toast.error(res.message, toastConfig)
                setBannerBlog(res.data)
            })
        }, [])


  return (
      <>
        <section>
              <Swiper
                  slidesPerView={1}
                  spaceBetween={10}
                  pagination={true}
                  modules={[Pagination]}
              >
                  { bannerBlog ? bannerBlog.map((blog, index) => (
                      <>
                          <SwiperSlide className='pb-10'>
                              <div className='h-[600px] from-slate-100 bg-gray-600 bg-opacity-40 outline w-full relative'>
                                  {
                                      blog?.image ?
                                          <img src={blog?.image} className='object-cover h-full w-full' alt={blog?.name}/> :
                                          <img src='/default_img.png' className='object-cover h-full w-full' alt={blog?.name} />
                                  }
                                  <div className='absolute hover:underline text-white bottom-10 left-10 font-bold text-5xl bg-black bg-opacity-50 p-4'>
                                      <Link to={`${PATH.BLOG}/${blog?.slug}`}>
                                          {blog?.title}
                                      </Link>
                                  </div>
                              </div>
                          </SwiperSlide>
                      </>
                  )) : <Loading />
                  }
              </Swiper>
          </section>

        <div className="container m-auto text-white h-auto py-5">

        <section className='h-fit'>
          <p className='text-secondary font-bold text-3xl'>MỚI NHẤT</p>
          <div className='grid grid-cols-12 gap-3 h-full border-t border-secondary py-3'>
              {
                  newestBlog && newestBlog === 0 &&
                  <p className='text-2xl py-32 font-semibold text-center col-span-12 text-white'>
                      Không có blog nào
                  </p>
              }
              {
                    newestBlog ? newestBlog.map((blog, index) => (
                        <NewBlogCard key={blog.id} blog={blog} reverse={index % 2 !== 0} />
                    )) : <Loading />

              }
          </div>
      </section>

        <section className='h-fit pt-10'>
            <p className='text-secondary font-bold text-3xl'>TOP NỔI BẬT</p>
            <div className='gap-3 h-full border-t border-secondary py-3'>
                {
                    outstandingBlog && outstandingBlog.length === 0 &&
                    <p className='text-2xl py-32 font-semibold text-center col-span-12 text-white'>
                        Không có blog nổi bật
                    </p>
                }
                <Swiper
                    slidesPerView={4}
                    spaceBetween={10}
                    pagination={true}
                    modules={[Pagination]}
                >
                {
                    outstandingBlog ? outstandingBlog.map((blog, index) => (
                        <>
                            <SwiperSlide className='pb-10'>
                                <NewBlogMiniCard key={blog.id} blog={blog} />
                            </SwiperSlide>
                        </>
                    )) : <Loading />
                }
                </Swiper>
            </div>
        </section>

        <section>
            <p className='text-secondary font-bold text-3xl'>BLOG</p>
            <div className='grid grid-cols-12 gap-3 h-full border-t border-secondary py-3'>
                {
                    blog && blog.length === 0 &&
                    <div className='text-2xl col-span-4 flex  w-full justify-center items-center font-semibold text-center text-white'>
                        <p className='w-full m-auto'>Không có blog nào</p>
                    </div>
                }
                {
                    blog && blog.length > 0 &&  <NewBlogCard blog={blog[0]} />
                }

                <div className='col-span-4 gap-3 flex flex-col'>
                    {
                        blog && blog.length > 0 && blog.slice(1, 5).map((blog, index) => (
                            <MiniBlogCard key={blog.id} blog={blog} />
                        ))
                    }
                </div>

                <div className='col-span-4 p-4 border border-gray-900 h-fit'>
                    <p className='text-secondary font-bold text-xl border-b border-gray-500'>Nên đọc</p>
                    <div className='col-span-4 gap-3 py-2 flex flex-col'>
                        <SuggestBlogs/>
                    </div>
                </div>
            </div>
        </section>
        </div>
      </>
  )
}

export default BlogPage

export function NewBlogCard({reverse = false, blog}) {
    if (reverse) {
        return (
            <Link to={`${PATH.BLOG}/${blog?.slug}`} className='col-span-4 grid grid-rows-2 max-h-[498px] hover:opacity-90 cursor-pointer border border-gray-900'>
                <div className='pb-4 pt-2 flex flex-col row-span-1 gap-1 px-3 h-fit'>
                        <span className='opacity-70'>
                            {blog?.created_at && timeAgo.format(new Date(blog?.created_at))}
                        </span>
                    <p className='leading-5 line-clamp-2 hover:text-secondary text-xl font-semibold'>
                        {blog?.title}
                    </p>
                    <p className="line-clamp-4 opacity-80">
                        {blog?.short_description}
                    </p>

                    <div className='flex gap-3'>
                        {
                            blog?.category?.map((category, index) => (
                                <span key={category.name} className='text-sm bg-[#5E54F3] bg-opacity-20 text-[#5E54F3] rounded-full px-2 py-1'>
                                    {category.name}
                                </span>
                            ))
                        }
                        <span className='opacity-70'>
                          5 phút đọc
                        </span>
                    </div>

                    <div className='flex gap-2 hover:text-secondary underline px-3 cursor-pointer hover:underline ml-auto justify-center items-center w-fit'>
                        <p>Xem ngay</p>
                    </div>

                </div>
                <div className='row-span-1 max-h-[280px]'>
                    {
                        blog?.image ? <img src={blog?.image} className='object-cover h-full w-full'  alt={blog?.name}/> :
                            <img src='/default_img.png' className='object-cover h-full w-full' alt={blog?.name} />
                    }
                </div>
            </Link>
        )
    }
    return (
        <Link to={`${PATH.BLOG}/${blog?.slug}`} className='col-span-4 grid grid-rows-2 max-h-[498px] hover:opacity-90 cursor-pointer border border-gray-900'>
            <div className='row-span-1 max-h-[280px]'>
                {
                    blog?.image ? <img src={blog?.image} className='object-cover h-full w-full'  alt={blog?.name}/> :
                        <img src='/default_img.png' className='object-cover h-full w-full' alt={blog?.name} />
                }
            </div>
            <div className='pb-4 pt-2 flex flex-col row-span-1 gap-1 px-3 h-fit'>
                        <span className='opacity-70'>
                            {blog?.created_at && timeAgo.format(new Date(blog?.created_at))}
                        </span>
                <p className='leading-5 line-clamp-2 hover:text-secondary text-xl font-semibold'>
                    {blog?.title}
                </p>
                <p className="line-clamp-4 opacity-80">
                    {blog?.short_description}
                </p>

                <div className='flex gap-3'>
                    {
                        blog?.category?.map((category, index) => (
                            <span key={category.name} className='text-sm bg-[#5E54F3] bg-opacity-20 text-[#5E54F3] rounded-full px-2 py-1'>
                                    {category.name}
                                </span>
                        ))
                    }
                    <span className='opacity-70'>
                          5 phút đọc
                        </span>
                </div>

                <div className='flex gap-2 hover:text-secondary underline px-3 cursor-pointer hover:underline ml-auto justify-center items-center w-fit'>
                    <p>Xem ngay</p>
                </div>

            </div>
        </Link>
    )
}

export function NewBlogMiniCard({reverse = false, blog}) {
    return (
        <Link to={`${PATH.BLOG}/${blog?.slug}`} className='col-span-3 grid hover:opacity-90 cursor-pointer border h-full border-gray-900'>
            <div className='row-span-1 h-[167px]'>
                {
                    blog?.image ? <img src={blog?.image} className='object-cover h-full w-full'  alt={blog?.name}/> :
                        <img src='/default_img.png' className='object-cover h-full w-full' alt={blog?.name} />
                }
            </div>
            <div className='pb-4 pt-2 row-span-2 flex flex-col gap-2 px-3 h-fit'>
                        <span className='opacity-70'>
                           {blog?.created_at && timeAgo.format(new Date(blog?.created_at))}
                        </span>
                <p className='leading-5 line-clamp-2 text-lg font-semibold'>
                    {blog?.title}
                </p>
                <p className="line-clamp-3 opacity-80 text-sm">
                    {blog?.short_description}
                </p>
                <div className='flex gap-3'>
                    {
                        blog?.category?.map((category, index) => (
                            <span key={category.name} className='text-sm bg-[#5E54F3] bg-opacity-20 text-[#5E54F3] rounded-full px-2 py-1'>
                                    {category.name}
                                </span>
                        ))
                    }
                    <span className='opacity-70'>
                      5 phút đọc
                    </span>
                </div>
            </div>
        </Link>
    )
}


export function MiniBlogCard({blog}) {
    return (
        <div className='row-span-1 border border-gray-900 rounded cursor-pointer grid grid-cols-5 '>
            <div className="col-span-2 max-h-[100px]">
                {
                    blog?.image ? <img src={blog?.image} className='object-cover h-full w-full'  alt={blog?.name}/> :
                        <img src='/default_img.png' className='object-cover h-full w-full col-span-2' alt={blog?.name} />
                }
            </div>

            <div className='col-span-3 flex flex-col p-2 h-full'>
                <Link to={`${PATH.BLOG}/${blog?.slug}`} className='text-base hover:text-secondary cursor-pointer line-clamp-2 font-semibold leading-5'>
                    {blog?.title}
                </Link>
                <p className="pt-auto opacity-60">
                    {blog?.created_at && timeAgo.format(new Date(blog?.created_at))}
                </p>
            </div>
        </div>
    )
}

