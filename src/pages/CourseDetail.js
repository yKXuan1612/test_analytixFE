import Breadcrumbs from "../components/Breadcrumbs";
import Loading from "../components/Loading";
import {MdKeyboardArrowRight} from "react-icons/md";
import {Link, useParams} from "react-router-dom";
import {PATH} from "../constants/paths";
import {CiClock2} from "react-icons/ci";
import {IoPersonOutline} from "react-icons/io5";
import {useEffect, useState} from "react";
import {getCourseDetail} from "../apis/api";
import {toast} from "react-toastify";
import {toastConfig} from "../config/toastConfig";
import parse from 'html-react-parser';
import {useDispatch} from "react-redux";
import {addToCart} from "../redux-action/cartAction";

function CourseDetail() {
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const [course, setCourse] = useState(null)

    const dispath = useDispatch();

    const handleAddToCart = () => {
        if (!course) return
        toast.success('Thêm vào giỏ hàng thành công', toastConfig)
        dispath(addToCart(course))
    }


    useEffect(() => {
        setLoading(true)
        getCourseDetail(params.id).then((res) => {
            setLoading(false)
            if (!res.success) return toast.error(res.message, toastConfig)
            setCourse(res.data)
        })
    }, [params.id])

  return (
      <div className="container m-auto h-auto pt-10">
            <section className="h-auto">
                <Breadcrumbs />
            </section>

          <section className='grid grid-cols-12 gap-5 pt-10'>
              {
                  loading ?
                      <div className='h-[800px] flex justify-center items-center col-span-12'>
                          <Loading />
                      </div>
                      : (
                        <>
                            <div className='col-span-9 pr-5'>
                                <div className='w-full border bg-gradient-to-r from-secondary to-[#F74986] p-1 rounded-3xl'>
                                    <div className='w-full h-full border rounded-2xl bg-white p-5 no-tailwindcss-base'>
                                        {
                                            course?.description && parse(course?.description)
                                        }
                                    </div>
                                </div>

                                <p className='py-5 font-semibold text-[#5E54F3] text-3xl'> CHƯƠNG TRÌNH HỌC </p>

                                <div className='flex flex-col gap-7'>
                                    {
                                        course?.learning_program?.map((item, index) => (
                                            <p key={item} className="py-3 px-4 w-full rounded bg-gradient-to-r from-[#F74986] to-[#471CF5]">{item}</p>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className='col-span-3 text-white'>
                                    <div className='grid-rows-5 w-full h-full'>
                                        <div className='row-span-2 outline'>
                                            {
                                                course?.image ? <img src={course?.image} className='w-full h-full object-cover' /> :
                                                    <img src='/default_img.png' className='w-full h-full object-cover' />
                                            }
                                        </div>
                                        <div className='row-span-3 outline px-2 py-3'>
                                            <p className='text-center pb-3 text-[#F74986] font-semibold'> {course?.name} </p>
                                            <div className='flex justify-between items-center py-2'>
                                                <p className='text-base font-normal'>Lịch học</p>
                                                <p className='text-base '>{course?.learning_time || "-"}</p>
                                            </div>

                                            <div className='flex justify-between items-center py-2'>
                                                <p className='text-base font-normal'> Số giờ học </p>
                                                <p className='text-base '>  {course?.time || "-"} </p>
                                            </div>

                                            <div className='flex justify-between items-center py-2'>
                                                <p className='text-base font-normal'> Hình thức </p>
                                                <p className='text-base '>  {course?.learning_form || "-"} </p>
                                            </div>

                                            <div className='flex justify-between items-center py-2'>
                                                <p className='text-base font-normal'> Level </p>
                                                <p className='text-base '> {course?.level || "-"} </p>
                                            </div>

                                            <div className='flex justify-between items-center py-2'>
                                                <p className='text-base font-normal'> Giấy chứng nhận </p>
                                                <p className='text-base '>{course?.certificate || "-"}</p>
                                            </div>

                                            <div className='flex justify-between items-center py-2'>
                                                <p className='text-base font-normal'> Giá </p>
                                                <p className='text-base '>{ course?.price }</p>
                                            </div>

                                            <button onClick={handleAddToCart} htmltype='submit' className='text-white py-1 px-3 m-auto mt-3 flex justify-center items-center rounded bg-gradient-to-r from-[#5E54F3] to-[#F74986]'>
                                                <p className='text-lg font-medium'>Thêm vào giỏ</p>
                                                <MdKeyboardArrowRight size={30} />
                                            </button>
                                        </div>
                                        <p className='py-5 font-semibold text-[#5E54F3] text-center text-lg'> KHÓA HỌC TƯƠNG TỰ </p>
                                        <div className='flex flex-col gap-4'>
                                            {
                                                course?.course_same?.map((course, index) => (
                                                    <CourseCard course={course} />
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                        </>
                    )
              }
          </section>
      </div>
  );
}

export default CourseDetail;

function CourseCard({course}) {
    return (
        <Link to={PATH.COURSE + "/" + course.slug} className="col-span-3 grid pb-1 grid-rows-4 border border-gray-800 cursor-pointer">
            <div className="row-span-3 flex items-center">
                {
                    course?.image ? <img src={course?.image} className='w-full h-full object-cover' /> :
                        <img src='/default_img.png' className='w-full h-full object-cover' />
                }
            </div>

            <div className="row-span-1 px-2 flex flex-col items-start py-2 transition">
                <p className='line-clamp-2 font-semibold hover:text-secondary leading-5'> {course?.name} </p>
                <div className='pt-2 pb-1 flex w-full justify-between h-fit items-center gap-4'>
                    <div className='flex gap-1'>
                        <CiClock2 size={20} />
                        <span className='text-sm'> {course?.time || "-"} </span>
                    </div>
                    <p className='font-medium   '> {course?.price || "-"} </p>
                </div>
            </div>
        </Link>
    )
}