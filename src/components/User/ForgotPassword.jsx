import React from 'react'
import HeaderSub from '../HeaderSub'
import Footer from '../Footer'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
const ForgotPassword = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Email không hợp lệ')
                .required('Vui lòng nhập email'),
        }),
        validateOnChange: true,
        onSubmit: (values) => {
            console.log("Email gửi OTP:", values.email);

            navigate("/authotp", { state: { email: values.email } });
        },
    })

    return (
        <>
            <HeaderSub />
            <div className='max-w-[650px] mx-auto py-5 mt-40 border border-gray-200 shadow-2xl rounded-lg'>
                <h2 className='text-center font-bold text-[24px] mb-3'>Quên mật khẩu</h2>
                <div className="w-[90%] mb-2 p-3 bg-green-200 text-green-800 rounded mx-auto ">
                    Vui lòng nhập email để cập nhật lại mật khẩu
                </div>
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
                    <div className='flex w-[90%] justify-between items-center mx-auto'>
                        <button
                            type='submit'
                            className='bg-amber-700 text-white font-bold rounded-lg px-4 py-2 cursor-pointer w-full hover:bg-amber-800 transition-all'
                        >
                            Gửi để nhận mã OTP
                        </button>
                    </div>

                </form>

            </div>
            <Footer />
        </>
    )
}

export default ForgotPassword
