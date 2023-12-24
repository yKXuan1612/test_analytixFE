import BANNER from "../constants/banners";
import { CiSearch } from "react-icons/ci";
import { Swiper, SwiperSlide } from 'swiper/react';
import { CiClock2 } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import 'swiper/css';
import {Link, useLocation, useParams} from "react-router-dom";
import Pagination from "../components/Pagination";
import ConsultationForm from "../components/ConsultationForm";
import {useEffect, useState} from "react";
import {getCourseCategory, getCourses} from "../apis/api";
import {toast} from "react-toastify";
import Loading from "../components/Loading";
import {PATH} from "../constants/paths";
import {toastConfig} from "../config/toastConfig";
import {useDispatch} from "react-redux";
import {addToCart} from "../redux-action/cartAction";
import {getQueryVariable} from "../utils/getQuery";
import classnames from "classnames";

function CoursePage() {
    const [courses, setCourses] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [category, setCategory] = useState(null)
    const params = useParams()
    const location = useLocation()


    useEffect(() => {
        setCourses(null)
        getCourses(null, getQueryVariable('category')).then((res) => {
            if (!res.success) return toast.error(res.message, toastConfig)
            setCourses(res.data)
            setCurrentPage(res.current_page)
            setTotalPage(res.total_page)
        })
    }, [params])

    useEffect(() => {
        getCourseCategory().then((res) => {
            if (!res.success) return toast.error(res.message, toastConfig)
            setCategory(res.data)
        })
    }, [])

    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPage) return
        if (pageNumber === currentPage) return
        getCourses(pageNumber).then((res) => {
            if (!res.success) return toast.error(res.message, toastConfig)
            setCourses(res.data)
            setCurrentPage(res.current_page)
            setTotalPage(res.total_page)
        })
    }

    return (
        <div className="container m-auto h-auto text-white">
            <section className="h-auto">
                <img src={BANNER.HOME}/>
            </section>

            <section className="h-auto py-1">
                <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-8 py-10">
                        <h1 className="text-6xl font-bold"> KHÓA HỌC </h1>
                    </div>
                    <div className="col-span-4 py-3 flex justify-center items-center">
                        <div className="h-fit ml-auto grid grid-cols-12 gap-2 bg-white py-2 px-4 rounded-xl">
                            <input className='col-span-10 text-black' placeholder='Tìm kiếm'/>
                            <CiSearch className='col-span-2 text-secondary m-auto cursor-pointer' size={20} />
                        </div>
                    </div>
                </div>
            </section>

            <section className="h-auto py-1">
                <Swiper
                    slidesPerView={4}
                    spaceBetween={10}
                >
                    {
                        category ? category.map((cate) => (
                                <SwiperSlide key={cate.name} className='bg-gradient-to-r from-[#F74986] to-white rounded-full p-[1.5px]'>
                                    <Link to={!getQueryVariable('category') || getQueryVariable('category') !== cate.slug ? '?category=' + cate.slug : PATH.COURSE} className='block bg-black rounded-full'>
                                        <p className={classnames("truncate py-3 px-4 text-center", {"text-secondary underline": getQueryVariable('category') === cate.slug})}>
                                            {cate?.name}
                                        </p>
                                    </Link>
                                </SwiperSlide>
                            )) :
                            <div className='h-[500px]'>
                                <Loading />
                            </div>
                    }
                </Swiper>
            </section>

            <section className="h-auto pt-5">
                <div className="grid grid-cols-12 gap-5">
                    {
                        courses && courses.length === 0
                        &&
                        <p className='text-2xl font-semibold text-center col-span-12 text-white'>
                            Không có khóa học nào
                        </p>
                    }
                    {
                        courses ? courses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        )) : <Loading />
                    }
                </div>
            </section>

            <section className="h-auto pt-10 w-full flex items-center justify-center">
                <Pagination currentPage={currentPage} totalPage={totalPage} onPageChange={handlePageChange} />
            </section>
        </div>
    );
}

export default CoursePage;

function CourseCard({course}) {
    const dispath = useDispatch();

    const handleAddToCart = () => {
        toast.success('Thêm vào giỏ hàng thành công', toastConfig)
        dispath(addToCart(course))
    }

    return (
        <div className="col-span-3 grid grid-rows-5 h-[400px] border border-gray-800 cursor-pointer">
            <div className="row-span-3 flex items-center">
                {
                    course?.course_img ? <img src={course?.course_img} className='w-full h-full object-cover' /> :
                        <img src='/default_img.png' className='w-full h-full object-cover' />
                }
            </div>

            <div className="row-span-2 px-2 flex flex-col items-start py-2 transition   ">
                <Link to={PATH.COURSE + "/" + course.slug} className='line-clamp-2 font-semibold hover:text-secondary leading-5'> {course?.name} </Link>
                <div className='pt-2 pb-1 flex gap-4'>
                    {
                        course.time &&
                        <div className='flex gap-1'>
                            <CiClock2 size={20} />
                            <span className='text-sm'> {course?.time} </span>
                        </div>
                    }

                    {
                        course.level &&
                        <div className='flex gap-1'>
                            <IoPersonOutline size={20} />
                            <span className='text-sm'> {course.level}  </span>
                        </div>
                    }

                </div>
                {
                    course.price && <p className='font-medium'> { course.price } </p>
                }
                <button onClick={handleAddToCart} className="mt-auto border px-3 mx-auto py-1 hover:opacity-80">Thêm vào giỏ hàng</button>
            </div>
        </div>
    )
}
