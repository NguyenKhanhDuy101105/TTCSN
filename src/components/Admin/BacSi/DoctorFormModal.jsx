// DoctorFormModal.jsx
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Validation schema
const DoctorSchema = Yup.object().shape({
    name: Yup.string().required("Tên bác sĩ không được để trống"),
    phoneNumber: Yup.string()
        .matches(/^[0-9]+$/, "Chỉ được nhập số")
        .min(9, "Số điện thoại từ 9–11 số")
        .max(11, "Số điện thoại từ 9–11 số")
        .required("Số điện thoại không được để trống"),
    shift: Yup.string().required("Chọn ca làm việc"),
    status: Yup.string().required("Chọn trạng thái"),
    specialtyIds: Yup.array().min(1, "Chọn ít nhất 1 chuyên khoa"),
});

export default function DoctorFormModal({ editingDoctor, specialties, onSave, onClose }) {
    const notifySuccess = (msg) =>
        toast.success(msg, { position: "top-right", autoClose: 2000 });
    const notifyError = (msg) =>
        toast.error(msg, { position: "top-right", autoClose: 2000 });

    const formik = useFormik({
        initialValues: editingDoctor || {
            name: "",
            phoneNumber: "",
            shift: "",
            status: "Hoạt động",
            specialtyIds: [],
        },
        validationSchema: DoctorSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            onSave(values);
            notifySuccess("Lưu thành công!");
        },
    });

    const { values, handleChange, handleSubmit, setFieldValue, errors, touched } = formik;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 px-4">
            <ToastContainer />
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-[fadeIn_0.25s_ease]">
                <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-800 text-center">
                    {editingDoctor ? "Sửa thông tin bác sĩ" : "Thêm bác sĩ mới"}
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    {/* Tên bác sĩ */}
                    <div>
                        <input
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            placeholder="Tên bác sĩ"
                            className="border border-gray-300 p-2 w-full rounded-lg"
                        />
                        {touched.name && errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    {/* Số điện thoại */}
                    <div>
                        <input
                            name="phoneNumber"
                            value={values.phoneNumber}
                            onChange={handleChange}
                            placeholder="Số điện thoại"
                            className="border border-gray-300 p-2 w-full rounded-lg"
                        />
                        {touched.phoneNumber && errors.phoneNumber && (
                            <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
                        )}
                    </div>

                    {/* Ca làm việc */}
                    <div>
                        <select
                            name="shift"
                            value={values.shift}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 w-full rounded-lg"
                        >
                            <option value="">Chọn ca làm việc</option>
                            <option value="Sáng">Sáng</option>
                            <option value="Chiều">Chiều</option>
                            <option value="Tối">Tối</option>
                        </select>
                        {touched.shift && errors.shift && <p className="text-red-500 text-sm">{errors.shift}</p>}
                    </div>

                    {/* Trạng thái */}
                    <div>
                        <select
                            name="status"
                            value={values.status}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 w-full rounded-lg"
                        >
                            <option value="Hoạt động">Hoạt động</option>
                            <option value="Ngưng hoạt động">Ngưng hoạt động</option>
                        </select>
                        {touched.status && errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
                    </div>

                    {/* Chuyên khoa */}
                    <div>
                        <label className="block mb-1 text-gray-700">Chọn chuyên khoa</label>
                        <select
                            multiple
                            value={values.specialtyIds}
                            onChange={(e) =>
                                setFieldValue(
                                    "specialtyIds",
                                    Array.from(e.target.selectedOptions, (option) => Number(option.value))
                                )
                            }
                            className="border border-gray-300 p-2 w-full rounded-lg h-32"
                        >
                            {specialties.map((s) => (
                                <option key={s.id} value={s.id}>
                                    {s.name}
                                </option>
                            ))}
                        </select>
                        {touched.specialtyIds && errors.specialtyIds && (
                            <p className="text-red-500 text-sm">{errors.specialtyIds}</p>
                        )}
                    </div>

                    {/* Nút */}
                    <div className="flex justify-end gap-3 mt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg hover:bg-gray-100">
                            Hủy
                        </button>
                        <button type="submit" className="px-4 py-2 bg-[#ad7555] text-white rounded-lg hover:bg-[#945f46]">
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
