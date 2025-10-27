import { useFormik } from 'formik'
import React from 'react'
import * as Yup from "yup"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm = ({ setIsLogin }) => {

    const notifySuccess = () => {
        toast.success("Đăng ký thành công!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
        });
    };
    const notifyError = () => {
        toast.error(`Đăng ký thất bại`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
        });
    };

    const formik = useFormik({
        initialValues: {
            fullName: "",
            phoneNumber: "",
            address: "",
            gender: null,
            dob: "",
            email: "",
            password: "",

        },
        validationSchema: Yup.object({
            fullName: Yup.string()
                .trim()
                .matches(/^[\p{L}\s]+$/u, "Họ tên chỉ được chứa chữ và khoảng trắng")
                .required("Vui lòng nhập họ tên"),

            address: Yup.string()
                .trim()
                .min(5, "Địa chỉ quá ngắn, vui lòng nhập chi tiết hơn")
                .required("Vui lòng nhập địa chỉ"),

            gender: Yup.number()
                .oneOf([0, 1], "Vui lòng chọn giới tính hợp lệ")
                .required("Vui lòng chọn giới tính"),

            dob: Yup.string()
                .matches(
                    /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
                    "Ngày sinh không hợp lệ (dd/MM/yyyy)"
                )
                .required("Vui lòng nhập ngày sinh"),

            email: Yup.string()
                .email("Email không hợp lệ (ví dụ: ten@gmail.com)")
                .required("Vui lòng nhập email"),

            password: Yup.string()
                .min(6, "Mật khẩu ít nhất 6 ký tự")
                .matches(/[A-Za-z]/, "Mật khẩu phải chứa ít nhất một chữ cái")
                .matches(/[0-9]/, "Mật khẩu phải chứa ít nhất một số")
                .required("Vui lòng nhập mật khẩu"),

            phoneNumber: Yup.string()
                .matches(/^(0[0-9]{9})$/, "Số điện thoại phải bắt đầu bằng 0 và có 10 chữ số")
                .required("Vui lòng nhập số điện thoại"),
        }),
        onSubmit: async (values) => {


            const dataToSend = {
                fullName: values.fullName,
                soDienThoai: values.phoneNumber,
                diaChi: values.address,
                gioiTinh: values.gender,
                ngaySinh: values.dob,
                email: values.email,
                password: values.password
            }

            try {
                const response = await fetch("http://localhost:8080/api/auth/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dataToSend)

                });
                console.log(values)
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("Đăng ký thất bại:", errorData.message);
                    notifyError();
                } else {
                    const data = await response.json();
                    console.log("Server trả về:", data);
                    notifySuccess();
                    setTimeout(() => {
                        setIsLogin(true);
                    }, 2000)
                }
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
                alert("Có lỗi xảy ra, vui lòng thử lại!");
            }
        },
        validateOnChange: true,
        validateOnBlur: true,
    })

    return (
        <div className='max-w-[600px] mx-auto py-5 mt-5 border border-gray-200 shadow-2xl rounded-lg '>
            <h2 className='text-center font-bold text-[24px] mb-3'>Đăng ký</h2>
            <ToastContainer />
            <form onSubmit={formik.handleSubmit} className='w-full mx-auto flex flex-col items-center' >
                <input
                    name='fullName'
                    type="text"
                    placeholder='Nhập họ và tên'
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className='border border-gray-300 py-2 px-4 w-[90%] mx-auto focus:outline-amber-800 mb-3'
                />
                {formik.touched.fullName && formik.errors.fullName && (
                    <p className='text-red-500 text-sm w-[90%] pb-2'>{formik.errors.fullName}</p>
                )}

                <input
                    name="phoneNumber"
                    type="text"
                    placeholder="Nhập số điện thoại"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="border border-gray-300 py-2 px-4 w-[90%] mx-auto focus:outline-amber-800 mb-3"
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                    <p className="text-red-500 text-sm w-[90%] pb-2">{formik.errors.phoneNumber}</p>
                )}

                <input
                    name="address"
                    type="text"
                    placeholder='Nhập địa chỉ'
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className='border border-gray-300 py-2 px-4 w-[90%] mx-auto focus:outline-amber-800 mb-3'
                />
                {formik.touched.address && formik.errors.address && (
                    <p className='text-red-500 text-sm w-[90%] pb-2'>{formik.errors.address}</p>
                )}

                <div className="flex self-start gap-5 w-[90%] mx-auto mb-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="gender"
                            value={1}
                            checked={formik.values.gender === 1}
                            onChange={(e) => formik.setFieldValue("gender", Number(e.target.value))}
                            onBlur={formik.handleBlur}
                        />
                        <span>Nam</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="gender"
                            value={0}
                            checked={formik.values.gender === 0}
                            onChange={(e) => formik.setFieldValue("gender", Number(e.target.value))}
                            onBlur={formik.handleBlur}
                        />
                        <span>Nữ</span>
                    </label>
                </div>
                {formik.touched.gender && formik.errors.gender && (
                    <p className='text-red-500 text-sm w-[90%] mb-3'>{formik.errors.gender}</p>
                )}

                <input
                    name="dob"
                    type="text"
                    placeholder='dd/MM/yyyy'
                    value={formik.values.dob}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className='border border-gray-300 py-2 px-4 w-[90%] mx-auto focus:outline-amber-800 mb-3'
                />
                {formik.touched.dob && formik.errors.dob && (
                    <p className='text-red-500 text-sm w-[90%] pb-2'>{formik.errors.dob}</p>
                )}

                <input
                    name='email'
                    type="email"
                    placeholder='Nhập email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className='border border-gray-300 py-2 px-4 w-[90%] mx-auto focus:outline-amber-800 mb-3'
                />
                {formik.touched.email && formik.errors.email && (
                    <p className='text-red-500 text-sm w-[90%] pb-2'>{formik.errors.email}</p>
                )}

                <input
                    name='password'
                    type="password"
                    placeholder='Nhập mật khẩu'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className='border border-gray-300 py-2 px-4 w-[90%] mx-auto focus:outline-amber-800 mb-3'
                />
                {formik.touched.password && formik.errors.password && (
                    <p className='text-red-500 text-sm w-[90%] pb-2'>{formik.errors.password}</p>
                )}

                <div className='flex w-[90%] justify-between items-center mx-auto mt-4'>
                    <p onClick={() => setIsLogin(true)}
                        className='text-[14px] text-blue-400 cursor-pointer'>Quay lại đăng nhập</p>
                    <button type='submit' className='bg-amber-700 text-white font-bold rounded-lg px-4 py-2 cursor-pointer'>Đăng ký</button>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm
