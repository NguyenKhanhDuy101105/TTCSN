import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const InforForm = ({ user, setInfor }) => {
    const [showPassword, setShowPassword] = useState(false)

    const formik = useFormik({
        initialValues: {
            full_name: user?.full_name || "",
            email: user?.email || "",
            phone: user?.phone || "",
            address: user?.address || "",
            dob: user?.dob || "",
            gender: user?.gender || "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: Yup.object({
            full_name: Yup.string()
                .required("Vui lòng nhập họ và tên"),
            email: Yup.string()
                .email("Email không hợp lệ")
                .required("Vui lòng nhập email"),
            phone: Yup.string()
                .matches(/^(?:\+84|0)[0-9]{9,10}$/, "Số điện thoại không hợp lệ")
                .required("Vui lòng nhập số điện thoại"),
            address: Yup.string()
                .required("Vui lòng nhập địa chỉ"),
            dob: Yup.date()
                .required("Vui lòng chọn ngày sinh"),
            gender: Yup.string()
                .required("Vui lòng chọn giới tính"),
            password: Yup.string()
                .required("Vui lòng nhập mật khẩu hiện tại"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không khớp")
                .required("Vui lòng nhập lại mật khẩu để xác nhận"),
        }),
        onSubmit: (values) => {
            console.log("Thông tin cập nhật:", values)
            // 👉 Gọi API PUT /api/users/update ở đây
        }
    })

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="rounded-[12px] p-6 w-full bg-white"
        >
            <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded">
                Vui lòng nhập mật khẩu hiện tại để xác nhận thay đổi thông tin
            </div>

            {/* Họ và tên + Email */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-semibold mb-1">Họ và tên *</label>
                    <input
                        type="text"
                        name="full_name"
                        value={formik.values.full_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Nhập họ và tên"
                        className="w-full border border-gray-300 rounded-[4px] bg-gray-100 p-2 focus:outline-none focus:border-[#bb4d00]"
                    />
                    {formik.touched.full_name && formik.errors.full_name && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.full_name}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1">Email *</label>
                    <input
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Nhập email"
                        className="w-full border border-gray-300 rounded-[4px] bg-gray-100 p-2 focus:outline-none focus:border-[#bb4d00]"
                    />
                    {formik.touched.email && formik.errors.email && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                    )}
                </div>
            </div>

            {/* Số điện thoại + Địa chỉ */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-semibold mb-1">Số điện thoại *</label>
                    <input
                        type="text"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Nhập số điện thoại"
                        className="w-full border border-gray-300 rounded-[4px] bg-gray-100 p-2 focus:outline-none focus:border-[#bb4d00]"
                    />
                    {formik.touched.phone && formik.errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">Địa chỉ *</label>
                    <input
                        type="text"
                        name="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Nhập địa chỉ"
                        className="w-full border border-gray-300 rounded-[4px] bg-gray-100 p-2 focus:outline-none focus:border-[#bb4d00]"
                    />
                    {formik.touched.address && formik.errors.address && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.address}</p>
                    )}
                </div>
            </div>

            {/* Ngày sinh + Giới tính */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-semibold mb-1">Ngày sinh *</label>
                    <input
                        type="date"
                        name="dob"
                        value={formik.values.dob}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full border border-gray-300 rounded-[4px] bg-gray-100 p-2 focus:outline-none focus:border-[#bb4d00]"
                    />
                    {formik.touched.dob && formik.errors.dob && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.dob}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">Giới tính *</label>
                    <select
                        name="gender"
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full border border-gray-300 rounded-[4px] bg-gray-100 p-2 focus:outline-none focus:border-[#bb4d00]"
                    >
                        <option value="">Chọn giới tính</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                    </select>
                    {formik.touched.gender && formik.errors.gender && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.gender}</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="relative">
                    <label className="block text-sm font-semibold mb-1">Mật khẩu hiện tại *</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Nhập lại mật khẩu để xác nhận"
                        className="w-full border border-gray-300 rounded-[4px] bg-gray-100 p-2 pr-10 focus:outline-none focus:border-[#bb4d00]"
                    />
                    <span
                        className="absolute right-3 top-[36px] cursor-pointer text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </span>
                    {formik.touched.password && formik.errors.password && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
                    )}
                </div>
            </div>

            {/* Nút hành động */}
            <div className="flex gap-x-3 justify-start">
                <button
                    type="submit"
                    className="px-4 py-2 cursor-pointer bg-[#bb4d00] rounded-[8px] text-white font-medium"
                >
                    Cập nhật thông tin
                </button>
                <button
                    type="button"
                    onClick={() => setInfor(true)}
                    className="px-4 py-2 cursor-pointer bg-[#6e7180] rounded-[8px] text-white font-medium"
                >
                    Hủy
                </button>
            </div>
        </form>
    )
}

export default InforForm
