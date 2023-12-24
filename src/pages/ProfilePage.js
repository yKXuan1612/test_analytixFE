import {Form, Input} from "antd";
import TextArea from "antd/es/input/TextArea";
import Loading from "../components/Loading";
import {MdKeyboardArrowRight} from "react-icons/md";
import {useEffect, useState} from "react";
import {getUserData, setUserData, useAuth} from "../utils/auth";
import {updateProfile} from "../apis/api";
import {toast} from "react-toastify";
import {toastConfig} from "../config/toastConfig";
import {Link} from "react-router-dom";
import {PATH} from "../constants/paths";

function ProfilePage () {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(getUserData())
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        setUser(null);
    }

    const handleSubmit = (values) => {
        if (loading) return
        setLoading(true)
        updateProfile(JSON.stringify(values)).then((res) => {
            setLoading(false)
            if (!res.success) return toast.error(res.message, toastConfig)
            toast.success('Cập nhật thành công', toastConfig)
            setUserData({ ...user, ...values })
            setUser( user => ({ ...user, ...values }))
        }).catch((err) => {
            setLoading(false)
            console.log(err)
        })
    }

  return (
  <div className="container m-auto text-white h-auto pt-10">
      <div className='grid grid-cols-12 h-full'>
            <div className='col-span-3 border border-gray-800'>
                <div className='mx-auto w-fit p-5 flex-col flex justify-center items-center'>
                    <div className='h-32 w-32 border rounded-full'>
                    </div>
                    <p className='text-xl font-semibold pt-3'>Ha Phan Bao Minh</p>
                </div>

                <div className='pt-3'>
                    <div className="p-3 bg-[#5E54F3]">Thông tin cá nhân</div>
                    <div className="p-3 text-[#5E54F3] hover:bg-gray-200 opacity-80 hover:bg-opacity-20 cursor-pointer transition-all">Ảnh</div>
                    <Link to={PATH.MY_COURSE + "/learning"} className="p-3 block text-[#5E54F3] hover:bg-gray-200 opacity-80 hover:bg-opacity-20 cursor-pointer transition-all">Quá trình học tập</Link>
                    <div onClick={handleLogout} className="p-3 transition-all text-[#5E54F3] cursor-pointer hover:bg-red-500 hover:text-white">Đăng xuất</div>
                </div>
            </div>

            <div className='col-span-9 border p-5 border-gray-800'>
                <div className='w-full text-center'>
                    <p className="text-3xl font-bold">Hồ sơ công khai</p>
                    <p>Thêm thông tin về bản thân</p>

                    <Form
                        form={form}
                        layout='vertical'
                        style={{ marginTop: '30px' }}
                        requiredMark={false}
                        initialValues={{
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            phoneNumber: user.phoneNumber,
                            description: user.description,
                        }}
                        onFinish={handleSubmit}
                    >
                        <Form.Item required tooltip="This is a required field"
                                   style={{ marginBottom: '0px'}}
                                   label={
                                       <p style={{ fontWeight: 500, color: 'white' }}>Họ và tên</p>
                                   }
                        >
                            <Form.Item name='firstName'  style={{ display: 'inline-block', width: 'calc(50% - 10px)', marginBottom: '20px' }}>
                                <Input placeholder="Nguyen Van"  style={{ border: '1px solid black', borderRadius: '0', fontSize: '15px', padding: '7px' }} />
                            </Form.Item>
                            <Form.Item name='lastName' style={{ display: 'inline-block', width: 'calc(50% - 10px)', marginLeft: '20px', marginBottom: '20px' }}>
                                <Input placeholder="A"  style={{ border: '1px solid black', borderRadius: '0', fontSize: '15px', padding: '7px' }} />
                            </Form.Item>
                        </Form.Item>

                        <Form.Item
                            name='email'
                            rules={[{ required: true, message: 'Hãy để lại email của bạn' }]}
                            style={{ marginBottom: '20px'}}
                            label={
                                <p style={{ fontWeight: 500, color: 'white' }}>Email</p>
                            }>
                            <Input placeholder="abc@gmail.com"  style={{ border: '1px solid black', borderRadius: '0', fontSize: '15px', padding: '7px' }} />
                        </Form.Item>

                        <Form.Item
                            rules={[{ required: true, message: 'Hãy để lại số điện thoại của bạn' }]}
                            name='phoneNumber'
                            style={{ marginBottom: '20px'}}
                            label={
                                <p style={{ fontWeight: 500, color: 'white' }}>Số điện thoại</p>
                            }>
                            <Input placeholder="xxx xxx xxx"  style={{ border: '1px solid black', borderRadius: '0', fontSize: '15px', padding: '7px' }} />
                        </Form.Item>

                        <Form.Item
                            name='description'
                            style={{ marginBottom: '20px'}}
                            label={
                                <p style={{ fontWeight: 500, color: 'white' }}>Mô tả</p>
                            }>
                            <TextArea rows={4} placeholder=" Mô tả về bạn "  style={{ border: '1px solid black', borderRadius: '0', fontSize: '15px' }} />
                        </Form.Item>

                        <Form.Item style={{ marginBottom: '15px' }} >
                            <div className='w-full flex justify-center cursor-pointer'>
                                <button htmltype='submit' className='bg-[#5E54F3] text-white font-semibold py-2 hover:opacity-80 cursor-pointer px-3 w-fit'>
                                    { loading ? <Loading /> : <span>Lưu thông tin</span> }
                                </button>
                            </div>
                        </Form.Item>
                    </Form>

                </div>
            </div>
      </div>
  </div>
  )
}

export default ProfilePage