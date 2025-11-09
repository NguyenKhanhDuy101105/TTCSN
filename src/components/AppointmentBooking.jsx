import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import HeaderSub from "./HeaderSub";
import Footer from "./Footer";

const AppointmentBooking = () => {
    const location = useLocation();
    const doctorFromNav = location.state?.doctor;

    useEffect(() => {
        if (doctorFromNav) {
            localStorage.setItem("selectedDoctor", JSON.stringify(doctorFromNav));
        }
    }, [doctorFromNav]);

    const doctor =
        doctorFromNav || JSON.parse(localStorage.getItem("selectedDoctor"));

    const user = JSON.parse(localStorage.getItem("user")) || {
        name: "",
        gender: "",
        phone: "",
        email: "",
        birthYear: "",
        address: "",
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Vui lòng nhập họ và tên"),
        phone: Yup.string()
            .matches(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ")
            .required("Vui lòng nhập số điện thoại"),
        email: Yup.string()
            .email("Email không hợp lệ")
            .required("Vui lòng nhập email"),
        birthYear: Yup.number()
            .min(1900, "Năm sinh không hợp lệ")
            .max(new Date().getFullYear(), "Năm sinh không hợp lệ")
            .required("Vui lòng nhập năm sinh"),
        address: Yup.string().required("Vui lòng nhập địa chỉ"),
        reason: Yup.string().required("Vui lòng nhập lý do khám"),
    });

    // ✅ Formik setup
    const formik = useFormik({
        initialValues: {
            name: user.name,
            gender: user.gender || "Nam",
            phone: user.phone,
            email: user.email,
            birthYear: user.birthYear,
            address: user.address,
            reason: "",
        },
        validationSchema,
        onSubmit: (values) => {
            console.log("Dữ liệu đặt lịch:", values);
            alert("✅ Đặt lịch khám thành công!");
        },
    });

    return (
        <div className="bg-gray-50 min-h-screen">
            <HeaderSub />

            <div className="max-w-5xl mx-auto bg-white mt-6 p-6 rounded-2xl shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Cột trái: thông tin bác sĩ */}
                <div className="border-r border-gray-100 pr-6">
                    <div className="flex items-center gap-4">
                        <img
                            src={doctor?.avatar}
                            alt={doctor?.name}
                            className="w-24 h-24 rounded-full object-cover"
                        />
                        <div>
                            <h2 className="text-lg font-semibold text-sky-700">
                                {doctor?.name}
                            </h2>
                            <p className="text-gray-600 text-sm">{doctor?.specialty}</p>
                            <p className="text-gray-500 text-sm">{doctor?.clinic}</p>
                        </div>
                    </div>

                    <div className="mt-4 text-sm text-gray-600">
                        <p>
                            <span className="font-semibold text-sky-700">Thời gian: </span>
                            {doctor?.schedule || "13:30 - 14:00, Thứ 4, 05/11/2025"}
                        </p>
                        <p>
                            <span className="font-semibold text-sky-700">Địa điểm: </span>
                            {doctor?.address || "Phòng khám XYZ, Hà Nội"}
                        </p>
                    </div>

                    <div className="mt-6 p-4 bg-sky-50 rounded-lg text-sky-700">
                        <p className="font-semibold">Giá khám: {doctor?.price || "500.000đ"}</p>
                        <p className="text-sm text-gray-600">Phí đặt lịch: Miễn phí</p>
                        <p className="font-bold mt-2 text-lg text-right">
                            Tổng cộng: {doctor?.price || "500.000đ"}
                        </p>
                    </div>
                </div>

                {/* Cột phải: form đặt lịch */}
                <form onSubmit={formik.handleSubmit} className="space-y-4 text-sm text-gray-700">
                    <h3 className="font-semibold text-lg text-sky-700 mb-2">
                        Thông tin người đặt lịch
                    </h3>

                    {/* Họ tên */}
                    <input
                        type="text"
                        name="name"
                        placeholder="Họ và tên"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:border-sky-400 focus:ring-sky-300"
                        {...formik.getFieldProps("name")}
                    />
                    {formik.touched.name && formik.errors.name && (
                        <p className="text-red-500 text-xs">{formik.errors.name}</p>
                    )}

                    {/* Giới tính */}
                    <div className="flex gap-4">
                        <label className="flex items-center gap-1">
                            <input
                                type="radio"
                                name="gender"
                                value="Nam"
                                checked={formik.values.gender === "Nam"}
                                onChange={formik.handleChange}
                            />
                            Nam
                        </label>
                        <label className="flex items-center gap-1">
                            <input
                                type="radio"
                                name="gender"
                                value="Nữ"
                                checked={formik.values.gender === "Nữ"}
                                onChange={formik.handleChange}
                            />
                            Nữ
                        </label>
                    </div>

                    {/* Số điện thoại */}
                    <input
                        type="text"
                        name="phone"
                        placeholder="Số điện thoại"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:border-sky-400"
                        {...formik.getFieldProps("phone")}
                    />
                    {formik.touched.phone && formik.errors.phone && (
                        <p className="text-red-500 text-xs">{formik.errors.phone}</p>
                    )}

                    {/* Email */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:border-sky-400"
                        {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <p className="text-red-500 text-xs">{formik.errors.email}</p>
                    )}

                    {/* Năm sinh */}
                    <input
                        type="number"
                        name="birthYear"
                        placeholder="Năm sinh"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:border-sky-400"
                        {...formik.getFieldProps("birthYear")}
                    />
                    {formik.touched.birthYear && formik.errors.birthYear && (
                        <p className="text-red-500 text-xs">{formik.errors.birthYear}</p>
                    )}

                    {/* Địa chỉ */}
                    <input
                        type="text"
                        name="address"
                        placeholder="Địa chỉ (Ví dụ: 123 Nguyễn Trãi, Thanh Xuân, Hà Nội)"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:border-sky-400"
                        {...formik.getFieldProps("address")}
                    />
                    {formik.touched.address && formik.errors.address && (
                        <p className="text-red-500 text-xs">{formik.errors.address}</p>
                    )}

                    {/* Lý do khám */}
                    <textarea
                        name="reason"
                        placeholder="Lý do khám"
                        className="w-full border border-gray-300 rounded-lg p-2 h-16 focus:border-sky-400"
                        {...formik.getFieldProps("reason")}
                    ></textarea>
                    {formik.touched.reason && formik.errors.reason && (
                        <p className="text-red-500 text-xs">{formik.errors.reason}</p>
                    )}

                    {/* Ghi chú và nút xác nhận */}
                    <div className="pt-2 border-t border-gray-200">
                        <p className="text-gray-600 text-xs mb-3">
                            <strong>Lưu ý:</strong> Vui lòng kiểm tra kỹ thông tin trước khi
                            xác nhận đặt khám.
                        </p>
                        <button
                            type="submit"
                            className="w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-lg font-semibold"
                        >
                            Xác nhận đặt khám
                        </button>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    );
};

export default AppointmentBooking;
