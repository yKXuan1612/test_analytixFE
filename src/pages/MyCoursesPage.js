import {Link, useLocation, useParams} from "react-router-dom";
import classnames from "classnames";
import {useEffect, useState} from "react";
import {getCourseCategory, getCourses, getMyCourses} from "../apis/api";
import {getQueryVariable} from "../utils/getQuery";
import {toast} from "react-toastify";
import {toastConfig} from "../config/toastConfig";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import {useDispatch} from "react-redux";
import {addToCart} from "../redux-action/cartAction";
import {PATH} from "../constants/paths";
import {CiClock2} from "react-icons/ci";
import {IoPersonOutline} from "react-icons/io5";

function MyCoursesPage() {
    const location = useLocation()
    const [courses, setCourses] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const params = useParams()

    useEffect(() => {
        setCourses(null)
        getMyCourses(null).then((res) => {
            if (!res.success) return toast.error(res.message, toastConfig)
            setCourses(res.data)
            setCurrentPage(res.current_page)
            setTotalPage(res.total_page)
        })
    }, [params])


    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPage) return
        if (pageNumber === currentPage) return
        getMyCourses(pageNumber).then((res) => {
            if (!res.success) return toast.error(res.message, toastConfig)
            setCourses(res.data)
            setCurrentPage(res.current_page)
            setTotalPage(res.total_page)
        })
    }

    return (
       <div className="container m-auto text-white h-auto mt-5">
           <section className="h-auto">
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

export default MyCoursesPage;

function CourseCard({course}) {
    const dispath = useDispatch();

    const handleAddToCart = () => {
        toast.success('Thêm vào giỏ hàng thành công', toastConfig)
        dispath(addToCart(course))
    }

    return (
        <div className="col-span-3 grid grid-rows-5 h-fit border border-gray-800 cursor-pointer">
            <div className="row-span-3 flex items-center">
                {
                    course?.course_img ? <img src={course?.course_img} className='w-full h-full object-cover' /> :
                        <img src='/default_img.png' className='w-full h-full object-cover' />
                }
            </div>

            <div className="row-span-2 px-2.5 flex flex-col items-start py-2.5 transition">
                <Link to={PATH.COURSE + "/" + course.slug} className='line-clamp-2 font-semibold hover:text-secondary leading-5'> {course?.name} </Link>
                <p className='line-clamp-2 font-light text-sm leading-5'>
                    {
                        course.teacher.map((teacher, index) => (
                            <span key={teacher.name}>{teacher.name} </span>
                        ))
                    }
                </p>
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
                <div className='flex-wrap'>
                    {
                        course?.category?.map((category, index) => (
                            <span key={category.name} className='text-sm bg-[#5E54F3] bg-opacity-20 text-[#5E54F3] rounded-full px-2 py-1'>
                            {category.name}
                        </span>
                        ))
                    }
                </div>
                <p className='line-clamp-2 pt-2 font-light text-sm leading-5'>
                    SL: {course?.quantity}
                </p>
            </div>
        </div>
    )
}
