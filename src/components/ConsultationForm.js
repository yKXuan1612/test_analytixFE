import {Button, Form, Input} from "antd";
import TextArea from "antd/es/input/TextArea";
import { MdKeyboardArrowRight } from "react-icons/md";
import {useState} from "react";
import {createConsultationForm} from "../apis/api";
import {toast} from "react-toastify";
import Loading from "./Loading";
import {toastConfig} from "../config/toastConfig";
import { Link, Element } from 'react-scroll';

function ConsultationForm() {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)

    const handleSubmit = (values) => {
        if (loading) return
        setLoading(true)
        createConsultationForm(values).then((res) => {
            setLoading(false)
            if (!res.success) return toast.error(res.message, toastConfig)
            toast.success('Đăng ký thành công', toastConfig)
            form.resetFields()
        })
    }

  return (
      <Element name="contact" className="element">
        <div className='w-full outline p-7'>
        <p className='text-3xl text-center font-bold uppercase'> Liên hệ với chúng tôi </p>
        <Form
            form={form}
            layout='vertical'
            style={{ marginTop: '30px' }}
            requiredMark={false}
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
                rules={[{ required: true, message: 'Hãy để lại tên khóa học bạn quan tâm' }]}
                name='courseName'
                style={{ marginBottom: '20px'}}
                label={
                    <p style={{ fontWeight: 500, color: 'white' }}>Khóa học quan tâm</p>
                }>
                <Input placeholder="AWS SAA"  style={{ border: '1px solid black', borderRadius: '0', fontSize: '15px', padding: '7px' }} />
            </Form.Item>

            <Form.Item
                name='message'
                style={{ marginBottom: '20px'}}
                label={
                    <p style={{ fontWeight: 500, color: 'white' }}>Lời nhắn</p>
                }>
                <TextArea rows={4} placeholder="Lời nhắn cho chúng tôi"  style={{ border: '1px solid black', borderRadius: '0', fontSize: '15px' }} />
            </Form.Item>

            <Form.Item style={{ marginBottom: '15px' }} >
                <div className='w-full outline flex justify-center cursor-pointer'>
                    <button htmltype='submit' className='text-white py-2 px-4 flex justify-center items-center rounded bg-gradient-to-r from-[#5E54F3] to-[#F74986]'>
                        {
                            loading ? <Loading /> :
                                <>
                                    <p className='text-xl font-medium'>Đăng ký ngay</p>
                                    <MdKeyboardArrowRight size={30} />
                                </>
                        }

                    </button>
                </div>
            </Form.Item>
        </Form>
    </div>
      </Element>
  );
}

export default ConsultationForm;