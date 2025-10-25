import React from 'react'
import logo from '../../assets/icons/google.svg'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = ({ setIsLogin }) => {
    const navigate = useNavigate();

    const notifySuccess = () => {
        toast.success("Đăng nhập thành công!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
        });
    };
    const notifyError = () => {
        toast.error(`Đăng nhập thất bại`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
        });
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Email không hợp lệ')
                .required('Vui lòng nhập email'),
            password: Yup.string()
                .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
                .required('Vui lòng nhập mật khẩu'),
        }),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            const dataToSend = {
                email: values.email,
                password: values.password,
            }

            try {
                const response = await fetch("http://localhost:8080/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dataToSend)

                });
                console.log(values)
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("Đăng nhập thất bại:", errorData.message);
                    notifyError();

                } else {
                    const data = await response.json();
                    notifySuccess();
                    console.log("Server trả về:", data);

                    localStorage.setItem("user", JSON.stringify(data));

                    setIsLogin(true);
                    setTimeout(() => {
                        navigate("/");
                    }, 2000)
                }
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
                alert("Có lỗi xảy ra, vui lòng thử lại!");
            }
        },
    })

    return (
        <div className='max-w-[650px] mx-auto py-5 mt-40 border border-gray-200 shadow-2xl rounded-lg'>
            <h2 className='text-center font-bold text-[24px] mb-3'>Đăng nhập</h2>
            <ToastContainer />
            <form onSubmit={formik.handleSubmit} className='w-full mx-auto flex flex-col items-center gap-y-6'>

                <div className='w-[90%]'>
                    <input
                        id='email'
                        name='email'
                        type='email'
                        placeholder='Nhập email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className='border border-gray-300 py-2 px-4 w-full focus:outline-amber-800 rounded'
                    />
                    {formik.touched.email && formik.errors.email && (
                        <p className='text-red-500 text-sm mt-3'>{formik.errors.email}</p>
                    )}
                </div>


                <div className='w-[90%]'>
                    <input
                        id='password'
                        name='password'
                        type='password'
                        placeholder='Nhập mật khẩu'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className='border border-gray-300 py-2 px-4 w-full focus:outline-amber-800 rounded'
                    />
                    {formik.touched.password && formik.errors.password && (
                        <p className='text-red-500 text-sm mt-3'>{formik.errors.password}</p>
                    )}
                </div>


                <div className='flex w-[90%] justify-between items-center mx-auto'>
                    <button
                        type='submit'
                        className='bg-amber-700 text-white font-bold rounded-lg px-4 py-2 cursor-pointer w-full hover:bg-amber-800 transition-all'
                    >
                        Đăng nhập
                    </button>
                </div>


                <div className='flex flex-col w-[90%] justify-between items-center mx-auto gap-y-3'>
                    <p className='text-[14px]'>
                        Bạn chưa có tài khoản? <span onClick={() => setIsLogin(false)}
                            className='text-blue-400  cursor-pointer'>Đăng ký ngay</span>
                    </p>
                    <p>
                        <Link to="/" className='text-[14px] cursor-pointer text-blue-400'>Quay lại trang chủ</Link>
                        <span className='mx-1 text-gray-300'>/</span>
                        <Link to="/forgotpassword" className='text-[14px] cursor-pointer text-blue-400'>Quên mật khẩu?</Link>
                    </p>
                </div>

                <div className='flex w-[90%] justify-between items-center mx-auto gap-3'>
                    <span className='bg-blue-700 text-white font-medium rounded-lg px-4 py-2 cursor-pointer w-[50%] flex gap-2 items-center justify-center'>
                        <i className='fa-brands fa-square-facebook'></i>
                        Đăng nhập bằng Facebook
                    </span>
                    <span className='font-medium rounded-lg px-4 py-2 cursor-pointer w-[50%] flex gap-2 items-center border border-gray-300 justify-center'>
                        <img src={logo} alt='' className='size-5' />
                        Đăng nhập bằng Google
                    </span>
                </div>
            </form>
        </div>
    )
}

export default LoginForm
