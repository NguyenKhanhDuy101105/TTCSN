import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation bằng Yup
const MedicalSchema = Yup.object().shape({
    name: Yup.string().required("Tên cơ sở không được để trống"),
    address: Yup.string().required("Địa chỉ không được để trống"),
    phoneNumber: Yup.string()
        .matches(/^[0-9]+$/, "Số điện thoại chỉ chứa số")
        .min(9, "Số điện thoại ít nhất 9 số")
        .max(11, "Số điện thoại tối đa 11 số")
        .required("Số điện thoại không được để trống"),
    doctorCount: Yup.number()
        .min(1, "Số bác sĩ phải lớn hơn 0")
        .required("Số bác sĩ không được để trống"),
});

export default function MedicalForm({ editingMedical, onSave, onClose }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 px-4">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-md animate-[fadeIn_0.25s_ease]">
                <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-800 text-center">
                    {editingMedical ? "Sửa cơ sở y tế" : "Thêm cơ sở y tế"}
                </h2>

                <Formik
                    initialValues={
                        editingMedical
                            ? {
                                name: editingMedical.name || "",
                                address: editingMedical.address || "",
                                phoneNumber: editingMedical.phoneNumber || "",
                                doctorCount: editingMedical.doctorCount || "",
                            }
                            : { name: "", address: "", phoneNumber: "", doctorCount: "" }
                    }
                    validationSchema={MedicalSchema}
                    onSubmit={(values) => {
                        onSave(values); // chỉ gọi callback, không tự sửa dữ liệu
                    }}
                    enableReinitialize
                >
                    {() => (
                        <Form>
                            {/* Tên cơ sở */}
                            <div className="mb-5">
                                <label className="block text-gray-700 font-medium mb-1">Tên cơ sở</label>
                                <Field
                                    name="name"
                                    placeholder="Nhập tên cơ sở"
                                    className="border border-gray-200 p-3 w-full rounded-xl focus:ring-1 focus:ring-gray-300 focus:border-gray-400 outline-none shadow-sm transition"
                                />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Địa chỉ */}
                            <div className="mb-5">
                                <label className="block text-gray-700 font-medium mb-1">Địa chỉ</label>
                                <Field
                                    name="address"
                                    placeholder="Nhập địa chỉ"
                                    className="border border-gray-200 p-3 w-full rounded-xl focus:ring-1 focus:ring-gray-300 focus:border-gray-400 outline-none shadow-sm transition"
                                />
                                <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Số điện thoại */}
                            <div className="mb-5">
                                <label className="block text-gray-700 font-medium mb-1">Số điện thoại</label>
                                <Field
                                    name="phoneNumber"
                                    placeholder="Nhập số điện thoại"
                                    className="border border-gray-200 p-3 w-full rounded-xl focus:ring-1 focus:ring-gray-300 focus:border-gray-400 outline-none shadow-sm transition"
                                />
                                <ErrorMessage
                                    name="phoneNumber"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {/* Số bác sĩ */}
                            <div className="mb-5">
                                <label className="block text-gray-700 font-medium mb-1">Số bác sĩ</label>
                                <Field
                                    name="doctorCount"
                                    type="number"
                                    placeholder="Nhập số bác sĩ"
                                    className="border border-gray-200 p-3 w-full rounded-xl focus:ring-1 focus:ring-gray-300 focus:border-gray-400 outline-none shadow-sm transition"
                                />
                                <ErrorMessage
                                    name="doctorCount"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {/* Nút */}
                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 border border-gray-400 rounded-xl hover:bg-gray-100 transition"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-[#ad7555] text-white rounded-xl shadow-md hover:bg-[#945f46] hover:scale-105 transition"
                                >
                                    {editingMedical ? "Cập nhật" : "Thêm mới"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
