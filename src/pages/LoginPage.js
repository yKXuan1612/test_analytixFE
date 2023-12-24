import {Form, Input} from "antd";
import {AiFillFacebook, AiFillGithub, AiOutlineGoogle} from "react-icons/ai";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {getUserData, useAuth} from "../utils/auth";
import {useContext, useEffect, useState} from "react";
import Loading from "../components/Loading";
import AuthContext from "../contexts/AuthContext";
import {toast} from "react-toastify";
import {toastConfig} from "../config/toastConfig";

function LoginPage() {
    const  { login }  = useAuth();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(getUserData())
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (user) {
            navigate(location.state?.from ? location.state.from : '/');
        }
    }, [])

    const onFinish = (values) => {
        setLoading(true);
        if (loading) {
            return;
        }
        login(values.username, values.password).then(
            (result) => {
                if (!result) {
                    setLoading(false);
                }
            }
        );
    }

  return (
      <div className='container mx-auto'>
          <div className='grid grid-cols-12 py-5 min-w-fit w-[400px] m-auto mt-3 bg-white rounded'>
              <div className='col-span-12 px-4 h-[550px] flex flex-col items-center justify-start gap-3'>
                  <h1 className='text-xl pt-5 pb-2 font-semibold text-secondary'>Đăng nhập</h1>
                  <Form
                      layout='vertical'
                      style={{ width: '100%', color:'white' }}
                      form={form}
                      name='form-login'
                      initialValues={{
                          username: '',
                          password: ''
                      }}
                      onFinish={onFinish}
                  >
                      <Form.Item
                          rules={[{ required: true, message: 'Hãy cung cấp tài khoản của bạn' }]}
                          label='Tài khoản' name='username'
                          style={{ marginBottom: '15px', color: 'white'  }}
                          labelCol={{ span: 24, style: { paddingBottom: 0, fontWeight: 500 } }}
                      >
                          <Input placeholder='username example' style={{ border: '2px solid black', borderRadius: '0' }} />
                      </Form.Item>
                      <Form.Item
                          rules={[{ required: true, message: 'Hãy cung cấp mật khẩu của bạn' }]}
                          label='Mật khẩu'
                          name='password'
                          labelCol={{ span: 24, style: { paddingBottom: 0, fontWeight: 500 } }}
                      >
                          <Input placeholder='correct horse battery staple' type='password' style={{ border: '2px solid black', borderRadius: '0' }} />
                      </Form.Item>
                      <Form.Item>
                          <button htmltype='submit' className="className='bg-primary w-full py-2 border-2 border-black text-black font-semibold active:outline-dashed'">
                              {
                                  loading ? <Loading /> :
                                        <span className='text-base'>
                                         Đăng nhập
                                        </span>
                              }
                          </button>
                      </Form.Item>
                  </Form>

                  <div className='w-full flex items-center pb-5 justify-between'>
                      <div className='border-t border-black h-0 w-[40%]' />
                      <span className='col-span-2 text-base font-semibold'>
                        HOẶC
                      </span>
                      <div className='border-t border-black h-0 w-[40%]' />
                  </div>

                  <div className='w-full h-[40px] mb-5 flex gap-5'>
                      <div className='flex items-center w-[50%] border-2 border-black justify-center gap-2 hover:cursor-pointer active:outline-dashed'>
                          <AiFillFacebook className='w-[30px] h-[30px]' />
                          <span className='text-sm'>Facebook</span>
                      </div>

                      <div className='flex items-center w-[50%] border-2 border-black justify-center gap-2 hover:cursor-pointer active:outline-dashed'>
                          <AiOutlineGoogle className='w-[30px] h-[30px]' />
                          <span className='text-sm'>Google</span>
                      </div>
                  </div>

                  <div className='flex gap-1'>
                      <span className='text-base font-semibold'>Bạn chưa có tài khoản?</span>
                      <Link to='/register' title='register' className='text-base font-semibold text-secondary hover:underline'>Đăng ký</Link>
                  </div>
                  <div className='flex gap-1'>
                      <Link to='/password-reset' className='text-sm underline italic hover:underline'>Quên mật khẩu?</Link>
                  </div>

              </div>
          </div>
      </div>
  );
}

export default LoginPage;