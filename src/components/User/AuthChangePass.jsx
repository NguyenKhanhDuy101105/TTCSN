import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff, RotateCw } from "lucide-react";
import HeaderSub from "../HeaderSub";
import Footer from "../Footer";

const AuthResetPassword = () => {
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [captcha, setCaptcha] = useState("");

    // ✅ Sinh captcha ngẫu nhiên
    const generateCaptcha = () => {
        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ123456789";
        let newCaptcha = "";
        for (let i = 0; i < 6; i++) {
            newCaptcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCaptcha(newCaptcha);
    };

    // ✅ Tự sinh captcha khi load trang
    useEffect(() => {
        generateCaptcha();
    }, []);

    // ✅ Khởi tạo formik
    const formik = useFormik({
        initialValues: {
            newPassword: "",
            confirmPassword: "",
            captchaInput: "",
        },
        validationSchema: Yup.object({
            newPassword: Yup.string()
                .min(6, "Mật khẩu mới phải ít nhất 6 ký tự")
                .required("Vui lòng nhập mật khẩu mới"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("newPassword"), null], "Mật khẩu xác nhận không khớp")
                .required("Vui lòng nhập lại mật khẩu mới"),
            captchaInput: Yup.string()
                .required("Vui lòng nhập mã xác nhận")
                .test("captcha-match", "Mã xác nhận không chính xác", function (value) {
                    return value === captcha;
                }),
        }),
        onSubmit: (values) => {
            console.log("🔐 Dữ liệu đặt lại mật khẩu:", values);
            alert("✅ Đặt lại mật khẩu thành công!");
            // 👉 Gọi API /reset-password ở đây (POST)
        },
    });

    return (
        <>
            <HeaderSub />
            <div className="max-w-[650px] mx-auto py-5 mt-40 border border-gray-200 shadow-2xl rounded-lg">
                <h2 className="text-center font-bold text-[24px] mb-3">
                    Đặt lại mật khẩu
                </h2>

                <form
                    onSubmit={formik.handleSubmit}
                    className="p-6 bg-white rounded-b-[12px]"
                >
                    {/* Mật khẩu mới */}
                    <div className="mb-5 relative">
                        <label className="block font-semibold mb-1">Mật khẩu mới *</label>
                        <input
                            type={showNew ? "text" : "password"}
                            name="newPassword"
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Nhập mật khẩu mới"
                            className="w-full border border-gray-300 bg-gray-100 rounded-[6px] p-2 pr-10 focus:outline-none focus:border-[#bb4d00]"
                        />
                        <span
                            className="absolute right-3 top-[38px] cursor-pointer text-gray-600"
                            onClick={() => setShowNew(!showNew)}
                        >
                            {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                        </span>
                        {formik.touched.newPassword && formik.errors.newPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {formik.errors.newPassword}
                            </p>
                        )}
                    </div>

                    {/* Xác nhận mật khẩu */}
                    <div className="mb-5 relative">
                        <label className="block font-semibold mb-1">
                            Xác nhận mật khẩu *
                        </label>
                        <input
                            type={showConfirm ? "text" : "password"}
                            name="confirmPassword"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Nhập lại mật khẩu mới"
                            className="w-full border border-gray-300 bg-gray-100 rounded-[6px] p-2 pr-10 focus:outline-none focus:border-[#bb4d00]"
                        />
                        <span
                            className="absolute right-3 top-[38px] cursor-pointer text-gray-600"
                            onClick={() => setShowConfirm(!showConfirm)}
                        >
                            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                        </span>
                        {formik.touched.confirmPassword &&
                            formik.errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">
                                    {formik.errors.confirmPassword}
                                </p>
                            )}
                    </div>

                    {/* CAPTCHA */}
                    <div className="mb-6">
                        <label className="block font-semibold mb-1">
                            Mã xác nhận (CAPTCHA) *
                        </label>
                        <div className="flex items-center gap-3">
                            {/* Mã CAPTCHA sinh ra */}
                            <input
                                name="captchaInput"
                                placeholder="Nhập mã"
                                value={formik.values.captchaInput}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="flex-1 border border-gray-300 bg-gray-100 rounded-[6px] p-2 focus:outline-none focus:border-[#bb4d00]"
                            />
                            <div className="bg-gray-200 rounded-lg px-4 py-2 font-mono text-lg font-bold tracking-widest">
                                {captcha}
                            </div>

                            {/* Ô nhập CAPTCHA */}


                            {/* Nút làm mới CAPTCHA */}
                            <RotateCw
                                className="cursor-pointer text-[#bb4d00]"
                                onClick={generateCaptcha}
                                size={22}
                                title="Làm mới mã"
                            />
                        </div>

                        {/* Hiển thị lỗi nếu có */}
                        {formik.touched.captchaInput && formik.errors.captchaInput && (
                            <p className="text-red-500 text-sm mt-1">
                                {formik.errors.captchaInput}
                            </p>
                        )}
                    </div>


                    {/* Nút hành động */}
                    <div className="flex gap-x-3 justify-start">
                        <button
                            type="submit"
                            className="px-4 py-2 cursor-pointer bg-[#bb4d00] rounded-[8px] text-white font-medium"
                        >
                            Xác nhận
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default AuthResetPassword;
