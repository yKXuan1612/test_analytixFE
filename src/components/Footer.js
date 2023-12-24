import Logo from "./Logo";
import { MdOutlineLocalPhone, MdOutlineMailOutline } from "react-icons/md";
import {CONTACTS} from "../constants/contacts";
import { FiHome } from "react-icons/fi";
import { FaFacebookF } from "react-icons/fa";
import {Link} from "react-router-dom";
import { SiZalo } from "react-icons/si";
import { LuDot } from "react-icons/lu";

function Footer() {
  return (
    <footer className='text-white m-auto mt-10'>
        <div className='grid-cols-12 gap-5 grid h-full bg-gradient-to-r from-[#9966FF] to-[#5E54F3] p-5 py-12'>
            <div className='col-span-3 h-full flex gap-5 flex-col justify-center items-center'>
                <Logo className='text-gray-800 h-24 w-fit' />
                <p className='text-black text-base font-medium'>Expertise - Excellence - Exploration</p>
            </div>

            <div className='col-span-3 flex flex-col gap-2'>
                <p className='text-black text-lg font-bold'> Thông tin liên hệ </p>
                <p className='text-base font-normal text-white'>
                    <MdOutlineLocalPhone size={20} className='inline-block mr-2 text-red-500' />
                    {CONTACTS.PHONE}
                </p>

                <p className='text-base font-normal text-white'>
                    <MdOutlineMailOutline size={20} className='inline-block mr-2 text-red-500' />
                    {CONTACTS.EMAIL}
                </p>

                <p className='text-base font-normal text-white'>
                    <FiHome size={20} className='inline-block mr-2 text-red-500' />
                    {CONTACTS.ADDRESS}
                </p>

                <p className='text-black text-lg font-bold pt-3'> Kết nối với chúng tôi </p>
                <div className='flex gap-3'>
                    <Link to={CONTACTS.FACEBOOK} target='_blank'>
                        <span className='p-3 rounded-full border w-fit flex justify-center items-center cursor-pointer'>
                            <FaFacebookF size={20} className='inline-block text-red-500' />
                        </span>
                    </Link>
                    <Link to={CONTACTS.ZALO} target='_blank'>
                        <span className='p-3 rounded-full border w-fit flex justify-center items-center cursor-pointer'>
                            <SiZalo size={20} className='inline-block text-red-500' />
                        </span>
                    </Link>
                </div>

            </div>

            <div className='col-span-3 flex flex-col gap-2'>
                <p className='text-black text-lg font-bold'> Quy định và chính sách </p>
                <p>
                    <LuDot size={20} className='inline-block text-red-500' />
                    <span className='text-base font-normal text-white'> Chính sách & quy định chung </span>
                </p>

                <p>
                    <LuDot size={20} className='inline-block text-red-500' />
                    <span className='text-base font-normal text-white'> Chính sách và quyền riêng tư </span>
                </p>

                <p>
                    <LuDot size={20} className='inline-block text-red-500' />
                    <span className='text-base font-normal text-white'> Chính sách bảo mật thông tin </span>
                </p>
            </div>

            <div className='col-span-3 flex flex-col gap-2'>
                <p className='text-black text-lg font-bold'> Về chúng tôi </p>
                <p>
                    <LuDot size={20} className='inline-block text-red-500' />
                    <span className='text-base font-normal text-white'> Blog </span>
                </p>

                <p>
                    <LuDot size={20} className='inline-block text-red-500' />
                    <span className='text-base font-normal text-white'> Thành tựu ấn tuượng </span>
                </p>
            </div>
        </div>
    </footer>
  );
}

export default Footer;