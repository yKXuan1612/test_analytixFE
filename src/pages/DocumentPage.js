import BANNER from "../constants/banners";
import {CiClock2, CiSearch} from "react-icons/ci";
import {Swiper, SwiperSlide} from "swiper/react";
import {Link, useLocation, useParams} from "react-router-dom";
import Pagination from "../components/Pagination";
import ConsultationForm from "../components/ConsultationForm";
import {IoPersonOutline} from "react-icons/io5";
import {useEffect, useState} from "react";
import {getCourseCategory, getCourses, getDocument, getDocumentCategory} from "../apis/api";
import {getQueryVariable} from "../utils/getQuery";
import {toast} from "react-toastify";
import {toastConfig} from "../config/toastConfig";
import {PATH} from "../constants/paths";
import classnames from "classnames";
import Loading from "../components/Loading";

function DocumentPage() {
    const [document, setDocument] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [category, setCategory] = useState(null)
    const params = useParams()
    const location = useLocation()

    useEffect(() => {
        setDocument(null)
        getDocument(null, getQueryVariable('category')).then((res) => {
            if (!res.success) return toast.error(res.message, toastConfig)
            setDocument(res.data)
            setCurrentPage(res.current_page)
            setTotalPage(res.total_page)
        })
    }, [params])

    useEffect(() => {
        getDocumentCategory().then((res) => {
            if (!res.success) return toast.error(res.message, toastConfig)
            setCategory(res.data)
        })
    }, [])

    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPage) return
        if (pageNumber === currentPage) return
        getDocument(pageNumber).then((res) => {
            if (!res.success) return toast.error(res.message, toastConfig)
            setDocument(res.data)
            setCurrentPage(res.current_page)
            setTotalPage(res.total_page)
        })
    }

    return (
    <div>
        <div className="container m-auto h-auto text-white">
            <section className="h-auto">
                <img src={BANNER.DOCUMENT}/>
            </section>

            <section className="h-auto py-1">
                <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-8 py-10">
                        <h1 className="text-6xl font-bold"> TÀI LIỆU </h1>
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
                                <SwiperSlide key={cate.name} className='bg-gradient-to-r from-pink-500 via-[#F74986] to-white rounded-full p-[1.5px]'>
                                    <Link to={!getQueryVariable('category') || getQueryVariable('category') !== cate.slug ? '?category=' + cate.slug : PATH.DOCUMENT} className='block bg-black rounded-full'>
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
                        document && document.length === 0
                        &&
                        <p className='text-2xl font-semibold text-center col-span-12 text-white'>
                            Không có tài liệu nào
                        </p>
                    }
                    {
                        document ? document.map((doc) => (
                            <DocumentCard key={doc.id} document={doc} />
                        )) : <Loading />
                    }
                </div>
            </section>

            <section className="h-auto pt-10 w-full flex items-center justify-center">
                <Pagination currentPage={currentPage} totalPage={totalPage} onPageChange={handlePageChange} />
            </section>
        </div>
    </div>
  );
}

export default DocumentPage;

function DocumentCard({document}) {
    return (
        <div className="col-span-3 p-4 grid gap-2 grid-rows-5 h-[310px] border border-gray-800 cursor-pointer">
            <div className="row-span-3 flex items-center">
                {
                    document?.image ? <img src={document?.image} className='w-full h-full object-cover' /> : <img src='/default_img.png' className='w-full h-full object-cover' />
                }
            </div>

            <div className="row-span-2 gap-2 flex flex-col items-start py-2 transition">
                {
                    document?.category?.map((category, index) => (
                        <span key={category.name} className='text-sm bg-[#5E54F3] bg-opacity-20 text-[#5E54F3] rounded-full px-2 py-1'>
                            {category.name}
                        </span>
                    ))
                }
                <Link to={PATH.DOCUMENT + "/" + document.slug} className='block line-clamp-2 font-semibold hover:text-secondary leading-5'> {document?.name}  </Link>
            </div>

            <Link to={PATH.DOCUMENT + "/" + document.slug} className='w-fit m-auto text-white bg-[#5E54F3] rounded-full px-3 py-1'>Xem ngay</Link>

        </div>
    )
}
