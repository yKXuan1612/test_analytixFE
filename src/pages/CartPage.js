import {Link} from "react-router-dom";
import {PATH} from "../constants/paths";
import {CiClock2} from "react-icons/ci";
import {IoPersonOutline} from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import {useDispatch, useSelector} from "react-redux";
import {addToCart, clearCart, deleteFromCart, removeFromCart} from "../redux-action/cartAction";
import {useEffect, useState} from "react";
import {toastConfig} from "../config/toastConfig";
import {toast} from "react-toastify";
import {checkout} from "../apis/api";
import {getUserData} from "../utils/auth";

function CartPage() {
    const cart = useSelector(state => state.cartReducer)
    const [totalPrice, setTotalPrice] = useState('0đ')
    const dispath = useDispatch();
    const [user, setUser] = useState(getUserData())
    const checkCart = () => {
        if (cart.length === 0) return toast.info('Giỏ hàng trống', toastConfig)
        const data = {
            courses: cart
        }
        if(!user) return toast.info('Vui lòng đăng nhập để thanh toán', toastConfig)
        checkout(JSON.stringify(data)).then((res) => {
            if (!res.success) return toast.error(res.message, toastConfig)
            window.open(res.payUrl, '_blank');
            dispath(clearCart())
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        let total = 0;
        cart.forEach(course => {
            const formatPrice = parseFloat(course.price.replace(/,/g, '').replace('đ', ''));
            total += formatPrice * course.quantity
        })
        setTotalPrice(total.toLocaleString() + 'đ')
    }, [cart])

    return (
    <div className="container m-auto h-auto text-white py-10">
      <h1 className='text-5xl font-semibold'>Giỏ hàng</h1>

        <div className='py-3 grid grid-cols-12 gap-4' >
            <div className='col-span-9 pr-5'>
                <p className='font-semibold py-3'>{cart.length} khóa học trong giỏ hàng</p>
                {
                    cart.map((course, index) => (
                        <CourseCard key={course.slug} course={course} />
                    ))
                }
            </div>

            <div className='col-span-3 pt-3'>
                <p className='text-base font-semibold text-gray-500'>Tổng:</p>
                <p className="text-2xl font-semibold"> {totalPrice} </p>
                <button onClick={checkCart} className='bg-[#5E54F3] text-white font-semibold py-2 hover:opacity-80 cursor-pointer mt-5 w-full'> Thanh toán </button>

                <div className='mt-5'>
                    <p className='text-base font-semibold text-gray-500'>Mã giảm giá:</p>
                    <div className='grid grid-cols-12'>
                        <input type="text" className='border border-[#5E54F3] px-2 py-1 col-span-8' />
                        <button className='bg-[#5E54F3] text-white col-span-4 font-semibold py-1 hover:opacity-80 cursor-pointer'> Áp dụng </button>
                    </div>
                </div>


            </div>
        </div>
    </div>
  );
}

export default CartPage;

function CourseCard({course}) {
    const dispath = useDispatch();

    const handleAddToCart = () => {
        dispath(addToCart(course))
    }

    const handleRemoveFromCart = () => {
        dispath(removeFromCart(course))
    }

    const deleteCourseFromCart = () => {
        dispath(deleteFromCart(course))
    }

    return (
        <div className="grid grid-cols-12 my-1 border border-gray-800 cursor-pointer">
            <div className="col-span-3 flex items-center">
                {
                    course?.image ? <img src={course?.image} className='w-full h-full object-cover' /> :
                        <img src='/default_img.png' className='w-full h-full object-cover' />
                }
            </div>
            <div className="col-span-6 ps-4 flex flex-col items-start py-2 transition">
                <Link to={PATH.COURSE + "/" + course.slug} className='line-clamp-2 font-semibold hover:text-secondary leading-5'> {course?.name} </Link>
                <p className='line-clamp-2 font-light text-sm leading-5'>
                    {
                        course.teacher.map((teacher, index) => (
                            <span key={teacher.name}>{teacher.name} </span>
                        ))
                    }
                </p>
                <div className='pt-2 pb-1 flex flex-wrap gap-1 justify-start items-center'>
                    {
                        <div className='flex gap-1'>
                            <CiClock2 size={20} />
                            <span className='text-sm'> {course?.time} </span>
                        </div>
                    }

                    {
                        <div className='flex gap-1 px-3'>
                            <IoPersonOutline size={20} />
                            <span className='text-sm'> {course?.level}  </span>
                        </div>
                    }
                    {
                        course?.category?.map((category, index) => (
                            <span className='text-sm bg-[#5E54F3] bg-opacity-20 text-[#5E54F3] rounded-full px-2 py-1'>
                                {category.name}
                            </span>
                        ))
                    }
                </div>

                {
                    <p className='font-medium pt-1 text-secondary'> Giá ưu đãi: {course?.price} </p>
                }
            </div>
            <div className="col-span-3 relative flex justify-center items-center">
                <RiDeleteBin5Line onClick={deleteCourseFromCart} size={30} className='p-1 border hover:bg-red-500 text-white top-0 absolute right-0' />
                <div className='text-white flex gap-2'>
                    <button onClick={handleRemoveFromCart} className="px-2 border">-</button>
                    <p className="className='w-10 text-center text-black bg-white px-3">{course.quantity}</p>
                    <button onClick={handleAddToCart} className="px-2 border">+</button>
                </div>
            </div>
        </div>
    )
}

